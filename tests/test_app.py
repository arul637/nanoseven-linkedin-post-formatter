"""Automated tests for the LinkedIn font formatter.

Covers the Unicode conversion engine and the Flask HTTP API.
Run with:  python -m pytest -v
"""

import sys
from pathlib import Path

import pytest

# Make the project root importable regardless of where pytest is launched from.
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import app  # noqa: E402
from unicode_styles import (  # noqa: E402
    STYLES,
    UnicodeStyle,
    MathematicalBold,
    MathematicalBoldItalic,
    MathematicalBoldScript,
    MathematicalItalic,
    MathematicalSansSerif,
    MathematicalSansSerifBold,
    MathematicalSansSerifBoldItalic,
    MathematicalSansSerifItalic,
    make_samples,
    reverse_map,
    to_plain,
)


# ---------------------------------------------------------------------------
# Unicode conversion engine
# ---------------------------------------------------------------------------


class TestUnicodeStyleBase:
    def test_empty_string(self):
        assert UnicodeStyle().convert("") == ""

    def test_upper_lower_digits_and_unknown_passthrough(self):
        class Fake(UnicodeStyle):
            UPPER_START = 0x1D400
            LOWER_START = 0x1D41A
            DIGIT_START = 0x1D7CE

        result = Fake().convert("Az09! Hello?")
        assert result == "".join(
            [
                chr(0x1D400),       # A
                chr(0x1D41A + 25),  # z
                chr(0x1D7CE),       # 0
                chr(0x1D7CE + 9),   # 9
                "! ",
                chr(0x1D400 + 7),   # H
                chr(0x1D41A + 4),   # e
                chr(0x1D41A + 11),  # l
                chr(0x1D41A + 11),  # l
                chr(0x1D41A + 14),  # o
                "?",
            ]
        )

    def test_unicode_uppercase_letters_are_untouched(self):
        # Ç is not a-z/A-Z so must pass through unchanged.
        assert UnicodeStyle().convert("Ç") == "Ç"


class TestMathematicalBold:
    def test_alphabet(self):
        out = MathematicalBold().convert("ABC abc")
        assert out == "".join(
            [
                chr(0x1D400), chr(0x1D401), chr(0x1D402),
                " ",
                chr(0x1D41A), chr(0x1D41B), chr(0x1D41C),
            ]
        )

    def test_digits(self):
        assert MathematicalBold().convert("0123456789") == "".join(
            chr(0x1D7CE + i) for i in range(10)
        )


class TestMathematicalItalic:
    def test_uppercase_italic(self):
        assert MathematicalItalic().convert("A") == chr(0x1D434)

    def test_lowercase_italic(self):
        assert MathematicalItalic().convert("a") == chr(0x1D44E)

    def test_special_h(self):
        # 'h' has no codepoint in the italic maths block -> ℎ (U+210E)
        assert MathematicalItalic().convert("h") == chr(0x210E)

    def test_digits_pass_through(self):
        assert MathematicalItalic().convert("123") == "123"


class TestAllRegisteredStyles:
    """A generic sweep over every style in the registry."""

    @pytest.mark.parametrize("style_name", list(STYLES.keys()))
    def test_converts_a_to_z(self, style_name):
        plain = "abcdefghijklmnopqrstuvwxyz"
        styled = STYLES[style_name]().convert(plain)
        # lowercase block: every char must move off its ASCII range
        assert all(ord(c) > 0x7F for c in styled)

    @pytest.mark.parametrize("style_name", list(STYLES.keys()))
    def test_converts_upper_and_digits(self, style_name):
        plain = "ABC 123 !@#"
        styled = STYLES[style_name]().convert(plain)
        # punctuation and spaces always pass through
        assert "!@#" in styled and " " in styled
        # uppercase letters become non-ASCII (all styles define UPPER_START)
        assert styled[0] > ""

    @pytest.mark.parametrize("style_name", list(STYLES.keys()))
    def test_length_is_preserved(self, style_name):
        plain = "The quick brown fox 1234567890! "
        styled = STYLES[style_name]().convert(plain)
        assert len(styled) == len(plain)

    @pytest.mark.parametrize("style_name", list(STYLES.keys()))
    def test_newlines_and_emoji_survive(self, style_name):
        plain = "line one\nline two 😊"
        styled = STYLES[style_name]().convert(plain)
        assert "\n" in styled and "😊" in styled


# ---------------------------------------------------------------------------
# Reverse mapping (clear formatting)
# ---------------------------------------------------------------------------


class TestToPlain:
    @pytest.mark.parametrize("style_name", list(STYLES.keys()))
    def test_round_trip_every_style(self, style_name):
        plain = "LinkedIn 2026!"
        styled = STYLES[style_name]().convert(plain)
        assert to_plain(styled) == plain

    def test_special_italic_h_round_trips(self):
        assert to_plain(MathematicalItalic().convert("h")) == "h"

    def test_plain_text_passes_through(self):
        assert to_plain("Already plain 🎉") == "Already plain 🎉"

    def test_reverse_map_covers_shared_digit_block(self):
        # both sans-serif-bold styles share the bold-digit block; both must
        # map back to the same ASCII digit
        m = reverse_map()
        assert m[0x1D7EC] == "0" and m[0x1D7EC + 9] == "9"

    def test_samples_are_styled_for_every_style(self):
        samples = make_samples()
        assert set(samples) == set(STYLES)
        for sample in samples.values():
            assert len(sample) == len("LinkedIn")
            assert any(ord(c) > 0x7F for c in sample)


# ---------------------------------------------------------------------------
# Flask API
# ---------------------------------------------------------------------------


@pytest.fixture()
def client():
    app.config["TESTING"] = True
    with app.test_client() as c:
        yield c


class TestIndexPage:
    def test_homepage_renders(self, client):
        res = client.get("/")
        assert res.status_code == 200
        assert b"LinkedIn Text Formatter" in res.data


class TestStylesEndpoint:
    def test_lists_all_styles(self, client):
        res = client.get("/api/styles")
        assert res.status_code == 200
        data = res.get_json()
        assert set(data["styles"]) == set(STYLES.keys())


class TestFormatEndpoint:
    def test_bold_format(self, client):
        res = client.post("/api/format", json={"text": "Hi", "style": "bold"})
        assert res.status_code == 200
        data = res.get_json()
        # bold 'H' = U+1D407, bold 'i' = U+1D422
        assert data["formatted"] == chr(0x1D407) + chr(0x1D422)

    def test_default_style_is_bold(self, client):
        res = client.post("/api/format", json={"text": "A"})
        assert res.status_code == 200
        assert res.get_json()["formatted"] == chr(0x1D400)

    def test_unknown_style_returns_400(self, client):
        res = client.post("/api/format", json={"text": "A", "style": "nope"})
        assert res.status_code == 400
        assert "error" in res.get_json()

    def test_empty_text_returns_empty(self, client):
        res = client.post("/api/format", json={"text": "", "style": "italic"})
        assert res.status_code == 200
        assert res.get_json()["formatted"] == ""

    def test_non_string_text_returns_400(self, client):
        res = client.post("/api/format", json={"text": 123, "style": "bold"})
        assert res.status_code == 400

    def test_missing_body_returns_400_for_unknown_style_but_handles_none(self, client):
        # silent get_json gives {}, style defaults to bold -> empty output
        res = client.post("/api/format", data="not json", content_type="text/plain")
        assert res.status_code == 200
        assert res.get_json()["formatted"] == ""

    @pytest.mark.parametrize("style_name", list(STYLES.keys()))
    def test_each_style_round_trips_via_api(self, client, style_name):
        plain = "LinkedIn post 2026"
        res = client.post(
            "/api/format", json={"text": plain, "style": style_name}
        )
        assert res.status_code == 200
        formatted = res.get_json()["formatted"]
        assert len(formatted) == len(plain)
        # every ASCII letter was replaced; digits are replaced only by
        # styles that define a digit block (italic-style blocks have none)
        for plain_ch, styled_ch in zip(plain, formatted):
            if plain_ch.isalpha():
                assert ord(styled_ch) > 0x7F
            elif plain_ch.isdigit():
                assert ord(styled_ch) > 0x7F or styled_ch == plain_ch

    def test_restyling_an_already_styled_selection_replaces_it(self, client):
        # bold "Hi" first, then ask for italic over the bold result -> italic
        bold = MathematicalBold().convert("Hi")
        res = client.post("/api/format", json={"text": bold, "style": "italic"})
        assert res.status_code == 200
        assert res.get_json()["formatted"] == MathematicalItalic().convert("Hi")

    def test_reapplying_the_same_style_is_stable(self, client):
        bold = MathematicalBold().convert("Hi")
        res = client.post("/api/format", json={"text": bold, "style": "bold"})
        assert res.status_code == 200
        assert res.get_json()["formatted"] == bold

    def test_restyling_mixed_styled_and_plain_text(self, client):
        # a selection can contain both styled and plain parts
        mixed = MathematicalBold().convert("Hi") + " there"
        res = client.post("/api/format", json={"text": mixed, "style": "sans_serif"})
        assert res.status_code == 200
        assert (
            res.get_json()["formatted"]
            == MathematicalSansSerif().convert("Hi there")
        )


class TestPlainEndpoint:
    def test_strips_style(self, client):
        res = client.post("/api/plain", json={"text": "𝐇𝐞𝐥𝐥𝐨"})
        assert res.status_code == 200
        assert res.get_json()["formatted"] == "Hello"

    def test_mixed_text_keeps_plain_parts(self, client):
        styled = MathematicalBold().convert("Hi")
        res = client.post(
            "/api/plain", json={"text": styled + " there " + styled}
        )
        assert res.status_code == 200
        assert res.get_json()["formatted"] == "Hi there Hi"

    def test_non_string_text_returns_400(self, client):
        res = client.post("/api/plain", json={"text": 5})
        assert res.status_code == 400

    def test_missing_body_is_handled(self, client):
        res = client.post("/api/plain", data="not json", content_type="text/plain")
        assert res.status_code == 200
        assert res.get_json()["formatted"] == ""
