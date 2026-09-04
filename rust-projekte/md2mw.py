#!/usr/bin/env python3
"""Konvertiert alle Markdown-Dateien aus rust-projekte/src in eine
MediaWiki-XML-Import-Datei (Export-Format 0.11)."""

import hashlib
import re
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape

BASE = Path(__file__).resolve().parent
SRC = BASE / "src"
OUT = BASE.parent / "thorsten.xml"

# Zuordnung Dateiname -> Wiki-Seitentitel
TITLES = {
    "roadmap.md": "Rust-Lernpfad Roadmap",
    "l1-grundlagen.md": "L1 Grundlagen",
    "l2-fortgeschritten.md": "L2 Fortgeschritten",
    "l3-profi.md": "L3 Profi",
    "l4-experte.md": "L4 Experte",
    "Impressum.md": "Impressum",
    "Datenschutz.md": "Datenschutz",
    "SUMMARY.md": "Inhaltsverzeichnis",
}

INLINE_LINK = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")

# KI-Transparenzhinweis (EU AI Act Art. 50), wird jeder Seite als Kopf und Fuß beigefügt
KI_HINWEIS = (
    "''Hinweis: Diese Inhalte wurden mit Unterstützung von Künstlicher Intelligenz "
    "erstellt und redaktionell überprüft (Transparenzhinweis gemäß Art. 50 EU AI Act).''"
)


def link_target(fname: str) -> str:
    fname = fname.split("#")[0].lstrip("./")
    return TITLES.get(fname, fname[:-3] if fname.endswith(".md") else fname)


def convert_inline(text: str) -> str:
    # Links: [Text](Ziel)
    def repl_link(m):
        label, url = m.group(1), m.group(2).strip()
        if url.startswith(("http://", "https://", "mailto:")):
            return f"[{url} {label}]"
        return f"[[{link_target(url)}|{label}]]"

    text = INLINE_LINK.sub(repl_link, text)
    # Inline-Code `x` -> <code>x</code>  (vor Fett/Kursiv, schützt Sternchen)
    parts = text.split("`")
    for i in range(1, len(parts), 2):
        parts[i] = "<code>" + parts[i].replace("'", "&#39;") + "</code>\x00"
    text = "".join(parts)
    # Fett **x** -> '''x'''
    text = re.sub(r"\*\*([^*]+)\*\*", r"'''\1'''", text)
    # Kursiv *x* -> ''x''
    text = re.sub(r"(?<![\*\w])\*([^*\n]+)\*(?!\*)", r"''\1''", text)
    text = text.replace("\x00", "")
    return text


def convert(md: str) -> str:
    lines = md.replace("\r\n", "\n").split("\n")
    out = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]

        # Tabelle
        if (
            "|" in line
            and i + 1 < n
            and re.match(r"^\s*\|?[\s:|-]*-[\s:|-]*$", lines[i + 1])
            and "|" in lines[i + 1]
        ):
            header = [c.strip() for c in line.strip().strip("|").split("|")]
            i += 2
            out.append('{| class="wikitable"')
            out.append("! " + " !! ".join(convert_inline(c) for c in header))
            while i < n and "|" in lines[i] and lines[i].strip():
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                out.append("|-")
                out.append("| " + " || ".join(convert_inline(c) for c in cells))
                i += 1
            out.append("|}")
            continue

        # Überschrift
        m = re.match(r"^(#{1,6})\s+(.*)$", line)
        if m:
            level = len(m.group(1))
            eq = "=" * level
            out.append(f"{eq} {convert_inline(m.group(2).strip())} {eq}")
            i += 1
            continue

        # Horizontale Linie
        if re.match(r"^\s*---+\s*$", line):
            out.append("----")
            i += 1
            continue

        # Blockquote (auch mehrzeilig)
        if re.match(r"^\s*>\s?", line):
            buf = []
            while i < n and re.match(r"^\s*>\s?", lines[i]):
                buf.append(convert_inline(re.sub(r"^\s*>\s?", "", lines[i])))
                i += 1
            out.append("<blockquote>" + "<br />".join(buf) + "</blockquote>")
            continue

        # Geordnete Liste (mit Einrückung -> Verschachtelung)
        m = re.match(r"^(\s*)(\d+)\.\s+(.*)$", line)
        if m:
            depth = len(m.group(1)) // 2 + 1
            out.append("#" * depth + " " + convert_inline(m.group(3)))
            i += 1
            continue

        # Ungeordnete Liste (mit Einrückung -> Verschachtelung)
        m = re.match(r"^(\s*)[-*+]\s+(.*)$", line)
        if m:
            depth = len(m.group(1)) // 2 + 1
            out.append("*" * depth + " " + convert_inline(m.group(2)))
            i += 1
            continue

        # Normale Zeile / Leerzeile
        out.append(convert_inline(line) if line.strip() else "")
        i += 1

    # Mehrfache Leerzeilen zusammenfassen
    text = "\n".join(out)
    text = re.sub(r"\n{3,}", "\n\n", text).strip() + "\n"
    return text


def main():
    files = sorted(
        SRC.glob("*.md"),
        key=lambda p: (p.name not in TITLES, list(TITLES).index(p.name) if p.name in TITLES else 0),
    )
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    pages = []
    for idx, f in enumerate(files, start=1):
        title = TITLES.get(f.name, f.stem)
        wikitext = convert(f.read_text(encoding="utf-8"))
        wikitext = f"{KI_HINWEIS}\n\n----\n\n{wikitext.rstrip()}\n\n----\n\n{KI_HINWEIS}\n"
        sha1 = hashlib.sha1(wikitext.encode("utf-8")).hexdigest()
        body = escape(wikitext)
        pages.append(f"""  <page>
    <title>{escape(title)}</title>
    <ns>0</ns>
    <id>{idx}</id>
    <revision>
      <id>{idx}</id>
      <timestamp>{ts}</timestamp>
      <contributor>
        <username>Thorsten Klöhn</username>
      </contributor>
      <comment>Import aus Markdown (rust-projekte/src/{escape(f.name)})</comment>
      <origin>{idx}</origin>
      <model>wikitext</model>
      <format>text/x-wiki</format>
      <text xml:space="preserve" bytes="{len(wikitext.encode('utf-8'))}">{body}</text>
      <sha1>{sha1}</sha1>
    </revision>
  </page>""")

    xml = f"""<mediawiki xmlns="http://www.mediawiki.org/xml/export-0.11/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.mediawiki.org/xml/export-0.11/ http://www.mediawiki.org/xml/export-0.11.xsd" version="0.11" xml:lang="de">
  <siteinfo>
    <sitename>Rust-Lernpfad</sitename>
    <dbname>rustlernpfad</dbname>
    <base>https://anfaenger.wissen-ahrensburg.de</base>
    <generator>md2mw.py</generator>
    <case>first-letter</case>
    <namespaces>
      <namespace key="0" case="first-letter" />
    </namespaces>
  </siteinfo>
{chr(10).join(pages)}
</mediawiki>
"""
    OUT.write_text(xml, encoding="utf-8")
    print(f"{len(pages)} Seiten -> {OUT}")


if __name__ == "__main__":
    main()
