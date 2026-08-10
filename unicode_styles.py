"""Unicode style engine for the LinkedIn font formatter.

Every style maps plain A-Z, a-z and 0-9 onto a block of Unicode
mathematical-alphanumeric code points that LinkedIn renders as styled
text (bold, italic, script, sans-serif, ...).

This module holds the whole engine. app.py imports from here and only
exposes it over HTTP.
"""


class UnicodeStyle:
    """Base class: subclasses define the start code points of each block.

    SPECIAL holds per-character exceptions (char -> code point).
    """

    UPPER_START = None
    LOWER_START = None
    DIGIT_START = None
    SPECIAL = {}

    def convert(self, text):
        result = []

        for ch in text:
            if ch in self.SPECIAL:
                result.append(chr(self.SPECIAL[ch]))

            elif "A" <= ch <= "Z":
                result.append(chr(self.UPPER_START + ord(ch) - ord("A"))) # type: ignore

            elif "a" <= ch <= "z":
                result.append(chr(self.LOWER_START + ord(ch) - ord("a"))) # type: ignore

            elif self.DIGIT_START is not None and "0" <= ch <= "9":
                result.append(chr(self.DIGIT_START + ord(ch) - ord("0")))

            else:
                result.append(ch)

        return "".join(result)


class MathematicalBold(UnicodeStyle):
    UPPER_START = 0x1D400
    LOWER_START = 0x1D41A
    DIGIT_START = 0x1D7CE


class MathematicalItalic(UnicodeStyle):
    UPPER_START = 0x1D434
    LOWER_START = 0x1D44E
    DIGIT_START = None
    SPECIAL = {
        "h": 0x210E  # no italic 'h' in the maths block; use ℎ
    }


class MathematicalBoldItalic(UnicodeStyle):
    UPPER_START = 0x1D468
    LOWER_START = 0x1D482
    DIGIT_START = None


class MathematicalBoldScript(UnicodeStyle):
    UPPER_START = 0x1D4D0
    LOWER_START = 0x1D4EA
    DIGIT_START = None


class MathematicalSansSerif(UnicodeStyle):
    UPPER_START = 0x1D5A0
    LOWER_START = 0x1D5BA
    DIGIT_START = 0x1D7E2


class MathematicalSansSerifBold(UnicodeStyle):
    UPPER_START = 0x1D5D4
    LOWER_START = 0x1D5EE
    DIGIT_START = 0x1D7EC


class MathematicalSansSerifItalic(UnicodeStyle):
    UPPER_START = 0x1D608
    LOWER_START = 0x1D622
    DIGIT_START = None


class MathematicalSansSerifBoldItalic(UnicodeStyle):
    UPPER_START = 0x1D63C
    LOWER_START = 0x1D656
    DIGIT_START = 0x1D7EC  # no bold-italic digits exist; fall back to bold digits


# ---------------------------------------------------------------------------
# Registry
# ---------------------------------------------------------------------------

STYLES = {
    "bold": MathematicalBold,
    "italic": MathematicalItalic,
    "bold_italic": MathematicalBoldItalic,
    "script": MathematicalBoldScript,
    "sans_serif": MathematicalSansSerif,
    "sans_serif_bold": MathematicalSansSerifBold,
    "sans_serif_italic": MathematicalSansSerifItalic,
    "sans_serif_bold_italic": MathematicalSansSerifBoldItalic,
}

STYLE_LABELS = {
    "bold": "Bold",
    "italic": "Italic",
    "bold_italic": "Bold Italic",
    "script": "Script",
    "sans_serif": "Sans-Serif",
    "sans_serif_bold": "Sans Bold",
    "sans_serif_italic": "Sans Italic",
    "sans_serif_bold_italic": "Sans Bold Italic",
}


def reverse_map():
    """Build code point -> ASCII char so styled text can be un-formatted.

    Uses setdefault so overlapping ranges (e.g. the two styles that share
    the bold-digit block) still resolve to the same ASCII digit.
    """
    mapping = {}
    for cls in STYLES.values():
        style = cls()
        if style.UPPER_START is not None:
            for i in range(26):
                mapping.setdefault(style.UPPER_START + i, chr(ord("A") + i))
        if style.LOWER_START is not None:
            for i in range(26):
                mapping.setdefault(style.LOWER_START + i, chr(ord("a") + i))
        if style.DIGIT_START is not None:
            for i in range(10):
                mapping.setdefault(style.DIGIT_START + i, chr(ord("0") + i))
        for ch, cp in style.SPECIAL.items():
            mapping.setdefault(cp, ch)
    return mapping


_REVERSE = reverse_map()


def to_plain(text):
    """Turn styled Unicode text back into plain ASCII where possible."""
    return "".join(_REVERSE.get(ord(ch), ch) for ch in text)


def make_samples(word="LinkedIn"):
    """Sample output for every style (used to label the toolbar buttons)."""
    return {key: cls().convert(word) for key, cls in STYLES.items()}
