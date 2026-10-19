from __future__ import annotations

import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
SITE_HOSTS = {"bluekeymortgage.ca", "www.bluekeymortgage.ca"}
NON_PAGE_SCHEMES = {"data", "javascript", "mailto", "sms", "tel"}


class AnchorParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.hrefs: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "a":
            return
        for name, value in attrs:
            if name.lower() == "href" and value:
                self.hrefs.append(value.strip())


def html_files() -> list[Path]:
    return sorted(path for path in ROOT.rglob("*.html") if ".git" not in path.parts)


def page_path(source: Path, href: str) -> Path | None:
    parsed = urlsplit(href)
    if parsed.scheme.lower() in NON_PAGE_SCHEMES:
        return None
    if parsed.netloc and parsed.hostname not in SITE_HOSTS:
        return None
    if parsed.scheme and parsed.scheme.lower() not in {"http", "https"}:
        return None

    path = unquote(parsed.path)
    if not path:
        return None
    if path.startswith("/cdn-cgi/"):
        return None

    target = ROOT / path.lstrip("/") if path.startswith("/") else source.parent / path
    target = target.resolve()
    try:
        target.relative_to(ROOT)
    except ValueError:
        return None

    if path.endswith("/"):
        return target / "index.html"
    if target.suffix and target.suffix.lower() != ".html":
        return None
    if target.suffix.lower() == ".html":
        return target
    return target.with_suffix(".html")


class InternalLinkTests(unittest.TestCase):
    def test_internal_page_links_use_canonical_extensionless_urls(self) -> None:
        violations: list[str] = []
        for source in html_files():
            parser = AnchorParser()
            parser.feed(source.read_text(encoding="utf-8"))
            for href in parser.hrefs:
                parsed = urlsplit(href)
                if parsed.netloc and parsed.hostname not in SITE_HOSTS:
                    continue
                if parsed.scheme.lower() in NON_PAGE_SCHEMES:
                    continue
                if parsed.path.lower().endswith(".html"):
                    violations.append(f"{source.relative_to(ROOT)}: {href}")

        self.assertEqual([], violations, "Internal links must not expose .html URLs:\n" + "\n".join(violations))

    def test_internal_page_link_targets_exist(self) -> None:
        missing: list[str] = []
        for source in html_files():
            parser = AnchorParser()
            parser.feed(source.read_text(encoding="utf-8"))
            for href in parser.hrefs:
                target = page_path(source, href)
                if target is not None and not target.is_file():
                    missing.append(
                        f"{source.relative_to(ROOT)}: {href} -> {target.relative_to(ROOT)}"
                    )

        self.assertEqual([], missing, "Internal page link targets must exist:\n" + "\n".join(missing))


if __name__ == "__main__":
    unittest.main()
