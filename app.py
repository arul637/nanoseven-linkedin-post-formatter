"""LinkedIn Font Formatter — Flask application.

The conversion engine lives in unicode_styles.py; this file only wires
it up over HTTP and renders the page.
"""

import os

from flask import Flask, jsonify, render_template, request

from unicode_styles import STYLES, STYLE_LABELS, make_samples, to_plain

app = Flask(__name__)


@app.route("/")
def index():
    """Render the editor + LinkedIn preview page.

    The toolbar buttons are labelled with a real styled sample for each
    style so users can see what the output looks like before clicking.
    """
    buttons = [
        {"key": key, "label": STYLE_LABELS[key], "sample": make_samples()[key]}
        for key in STYLES
    ]
    return render_template("index.html", buttons=buttons)


@app.route("/api/styles")
def list_styles():
    """Return every available style key -> display label."""
    return jsonify({"styles": STYLE_LABELS})


@app.route("/api/format", methods=["POST"])
def format_text():
    """Convert a substring of text into the requested style.

    Request body: {"text": "...", "style": "bold"}
    The frontend sends only the selected portion, so exactly that part
    of the editor gets replaced.
    """
    data = request.get_json(silent=True) or {}
    text = data.get("text", "")
    style = data.get("style", "bold")

    if not isinstance(text, str):
        return jsonify({"error": "'text' must be a string"}), 400

    if not isinstance(style, str) or style not in STYLES:
        return (
            jsonify(
                {
                    "error": f"Unknown style '{style}'. "
                    f"Available: {', '.join(STYLES)}"
                }
            ),
            400,
        )

    # Normalise the selection to plain text first. The converter passes
    # non-ASCII characters through unchanged, so without this, styling an
    # already-styled (Unicode) selection would silently do nothing. With it,
    # bold -> italic works: the old styling is stripped, then the new style
    # is applied to just the selected portion.
    plain = to_plain(text)
    return jsonify({"style": style, "formatted": STYLES[style]().convert(plain)})


@app.route("/api/plain", methods=["POST"])
def plain_text():
    """Strip styling: map styled code points back to plain ASCII."""
    data = request.get_json(silent=True) or {}
    text = data.get("text", "")

    if not isinstance(text, str):
        return jsonify({"error": "'text' must be a string"}), 400

    return jsonify({"formatted": to_plain(text)})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)
