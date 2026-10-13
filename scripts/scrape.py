"""Download HTL B2 reading/listening tasks + solutions from aufgabenpool.at."""
import json, os, re, sys, time, urllib.parse, urllib.request

BASE = "https://aufgabenpool.at/srdp_lfs/"
OUT = "data/raw"
UA = {"User-Agent": "Mozilla/5.0", "X-Requested-With": "XMLHttpRequest",
      "Referer": BASE + "index.php?id=en"}


def req(url, data=None, tries=4):
    body = urllib.parse.urlencode(data).encode() if data is not None else None
    for i in range(tries):
        try:
            r = urllib.request.Request(url, data=body, headers=UA)
            with urllib.request.urlopen(r, timeout=60) as resp:
                return resp.read()
        except Exception as e:  # noqa
            print("retry", url, e, file=sys.stderr)
            time.sleep(2 ** i)
    raise RuntimeError("failed " + url)


def main():
    os.makedirs(OUT, exist_ok=True)
    links = {}
    for gers, skill in [("1", "LE"), ("2", "HO")]:
        start, page = 0, 0
        while page < 30:
            html = req(BASE + "php/results.php", {
                "getData": 1, "start": start, "limit": 50, "aname_send": -1, "coll_send": -1,
                "coll": "", "gate": "en", "level": "B2", "typ": "5", "format": "0",
                "gers": gers, "spalte": "sortById", "asc": 0}).decode("utf-8", "replace")
            if not html.strip() or html.strip() == "reachedMax":
                break
            open(os.path.join(OUT, f"list_{skill}_{page:02d}.html"), "w").write(html)
            for p in re.findall(r"aufgaben/[^\"'\s)<>]+?\.(?:pdf|PDF)", html):
                links.setdefault(p, skill)
            print(skill, page, len(html))
            start += 50
            page += 1
    print("pdf links:", len(links))
    for p in sorted(links):
        dest = os.path.join(OUT, "pdf", p.replace("aufgaben/", "").replace("/", "__"))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        cands = [p] + ([p[:-4] + "_LO.pdf"] if not p.endswith("_LO.pdf") else [])
        for c in cands:
            d = os.path.join(OUT, "pdf", c.replace("aufgaben/", "").replace("/", "__"))
            if os.path.exists(d):
                continue
            try:
                data = req(BASE + urllib.parse.quote(c), tries=2)
                if data[:4] == b"%PDF":
                    open(d, "wb").write(data)
            except Exception as e:
                print("dl fail", c, e)
    json.dump(links, open(os.path.join(OUT, "links.json"), "w"), indent=1, ensure_ascii=False)


if __name__ == "__main__":
    main()
