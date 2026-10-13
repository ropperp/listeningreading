"""Save aufgabenpool index page + referenced JS for inspection."""
import os, re, urllib.request
B = "https://aufgabenpool.at/srdp_lfs/"
OUT = "data/recon"
os.makedirs(OUT, exist_ok=True)
def get(u):
    return urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"}), timeout=60).read()
html = get(B + "index.php?id=en").decode("utf-8", "replace")
open(f"{OUT}/index.html", "w").write(html)
for src in set(re.findall(r'src="([^"]+\.js[^"]*)"', html)):
    if src.startswith("http"):
        continue
    try:
        open(f"{OUT}/" + src.replace("/", "__"), "wb").write(get(B + src))
    except Exception as e:
        print("fail", src, e)
