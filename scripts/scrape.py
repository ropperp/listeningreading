"""Download HTL B2 reading/listening tasks + solutions from aufgabenpool.at."""
import json, os, re, sys, time, urllib.parse, urllib.request

BASES = ["https://aufgabenpool.at/srdp_lfs/", "https://www.aufgabenpool.at/srdp_lfs/"]
OUT = "data/raw"
UA = {"User-Agent": "Mozilla/5.0", "X-Requested-With": "XMLHttpRequest"}


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
    base = None
    for b in BASES:
        try:
            req(b + "index.php?id=en", tries=2)
            base = b
            break
        except Exception as e:
            print("base failed", b, e)
    if not base:
        sys.exit("aufgabenpool not reachable")
    found = {}
    for fert in ["Lesen", "Hören"]:
        for styp in ["5", ""]:
            html = req(base + "phpcode/desk_results.php",
                       {"fert": fert, "komp": "B2", "styp": styp, "aufg": "", "id": "en", "a_checked": ""}).decode("utf-8", "replace")
            name = f"list_{'LE' if fert == 'Lesen' else 'HO'}_{styp or 'all'}.html"
            open(os.path.join(OUT, name), "w").write(html)
            print(name, len(html))
            if styp == "5":
                for p in re.findall(r"aufgaben/\d+/[^\"'\s)<>]+?\.pdf", html):
                    found.setdefault(p, fert)
    print("pdfs:", len(found))
    for p in sorted(found):
        dest = os.path.join(OUT, p.replace("aufgaben/", "").replace("/", "__"))
        if os.path.exists(dest):
            continue
        try:
            open(dest, "wb").write(req(base + urllib.parse.quote(p)))
        except Exception as e:
            print("dl fail", p, e)
        # also grab LO companion if not listed
        if not p.endswith("_LO.pdf"):
            lo = p[:-4] + "_LO.pdf"
            d2 = os.path.join(OUT, lo.replace("aufgaben/", "").replace("/", "__"))
            if lo not in found and not os.path.exists(d2):
                try:
                    open(d2, "wb").write(req(base + urllib.parse.quote(lo), tries=1))
                except Exception:
                    pass
    json.dump(found, open(os.path.join(OUT, "index.json"), "w"), indent=1, ensure_ascii=False)


if __name__ == "__main__":
    main()
