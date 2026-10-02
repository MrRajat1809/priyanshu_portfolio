"""Build the sepsis-burden choropleth data used on the portfolio home page.

Source data
    Rudd KE, Johnson SC, Agesa KM, et al. Global, regional, and national
    sepsis incidence and mortality, 1990-2017: analysis for the Global Burden
    of Disease Study. Lancet 2020; 395: 200-11.
    doi:10.1016/S0140-6736(19)32989-7. Open access under CC BY 4.0.
    Country values are read from supplementary appendix eTable 11 (sepsis
    age-standardised mortality rate per 100 000, all underlying causes, 2017);
    location levels are read from eTable 7.

Boundaries
    Natural Earth 1:50m admin-0 countries (public domain).

Outputs
    public/data/gbd2017_sepsis_mortality.csv   country-level values with 95% UIs
    data/sepsis_map.json                       projected SVG paths for the site

Usage
    python scripts/build_sepsis_map.py [--cache .cache/gbd]

Requires PyMuPDF (fitz) and NumPy.
"""

import argparse
import csv
import json
import math
import re
import unicodedata
import urllib.request
from pathlib import Path

import fitz
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
APPENDIX_URL = "https://pmc-oa-opendata.s3.amazonaws.com/PMC6970225.1/mmc1.pdf"
BOUNDARY_URL = (
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/"
    "geojson/ne_50m_admin_0_countries.geojson"
)

# 0-based page ranges in the appendix PDF.
ETABLE7_PAGES = range(33, 51)
ETABLE11_PAGES = range(69, 79)

# Class breaks follow the published map (deaths per 100 000).
BREAKS = [100, 250, 500, 750]
LABELS = ["0 to <100", "100 to <250", "250 to <500", "500 to <750", "750 to 1081"]

# Map frame: Equal Earth projection, Antarctica omitted.
WIDTH = 960
MIN_LAT = -58.0
SIMPLIFY_PX = 0.35

# GBD location names that differ from every Natural Earth name field.
ALIASES = {
    "the bahamas": "BHS",
    "the gambia": "GMB",
    "cape verde": "CPV",
    "congo (brazzaville)": "COG",
    "dr congo": "COD",
    "democratic republic of the congo": "COD",
    "cote d'ivoire": "CIV",
    "swaziland": "SWZ",
    "eswatini": "SWZ",
    "macedonia": "MKD",
    "federated states of micronesia": "FSM",
    "taiwan (province of china)": "TWN",
    "virgin islands, u.s.": "VIR",
    "virgin islands": "VIR",
    "northern mariana islands": "MNP",
    "usa": "USA",
    "united states": "USA",
    "uk": "GBR",
    "russian federation": "RUS",
    "laos": "LAO",
    "south korea": "KOR",
    "north korea": "PRK",
    "syria": "SYR",
    "palestine": "PSE",
    "timor-leste": "TLS",
    "brunei": "BRN",
    "bolivia": "BOL",
    "iran": "IRN",
    "vietnam": "VNM",
    "venezuela": "VEN",
    "tanzania": "TZA",
    "moldova": "MDA",
    "czech republic": "CZE",
    "sao tome and principe": "STP",
    "saint vincent and the grenadines": "VCT",
    "swaziland (eswatini)": "SWZ",
}

# eTable 11 short names that differ from the eTable 7 hierarchy.
HIERARCHY_NAMES = {"usa": "united states", "dr congo": "democratic republic of the congo"}

# Natural Earth units that GBD does not report separately; they take the value
# of the internationally recognised state in which GBD reports them.
PARENT_UNIT = {"SOL": "SOM", "CYN": "CYP", "HKG": "CHN", "MAC": "CHN"}


def fetch(url, path):
    if not path.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(url, path)
    return path


def norm(text):
    text = text.replace("’", "'")
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"(\w)- (\w)", r"\1-\2", text)
    return re.sub(r"\s+", " ", text).strip().lower()


def clean_cell(cell):
    return re.sub(r"\s+", " ", (cell or "").replace("\n", " ")).strip()


def parse_ui(cell):
    m = re.match(r"(-?[\d.,]+)\s*\((-?[\d.,]+)\s*-\s*(-?[\d.,]+)\)", clean_cell(cell))
    if not m:
        return None
    return [float(x.replace(",", "")) for x in m.groups()]


def read_levels(doc):
    levels = {}
    for pno in ETABLE7_PAGES:
        for table in doc[pno].find_tables().tables:
            for row in table.extract():
                if len(row) >= 2 and clean_cell(row[1]).isdigit():
                    # First occurrence wins: Georgia and Mexico are also subnational names.
                    levels.setdefault(norm(clean_cell(row[0])), int(clean_cell(row[1])))
    return levels


def read_mortality(doc, levels):
    rows = []
    for pno in ETABLE11_PAGES:
        for table in doc[pno].find_tables().tables:
            for row in table.extract():
                name = clean_cell(row[0])
                if not name or name == "Location" or len(row) < 4:
                    continue
                change, rate, deaths = parse_ui(row[1]), parse_ui(row[2]), parse_ui(row[3])
                if rate is None:
                    continue
                key = norm(name)
                rows.append({
                    "location": re.sub(r"(\w)- (\w)", r"\1-\2", name),
                    "level": levels.get(HIERARCHY_NAMES.get(key, key)),
                    "asmr_2017": rate[0], "asmr_lower": rate[1], "asmr_upper": rate[2],
                    "deaths_2017": deaths[0] if deaths else None,
                    "deaths_lower": deaths[1] if deaths else None,
                    "deaths_upper": deaths[2] if deaths else None,
                    "asmr_change_1990_2017": change[0] if change else None,
                })
    return rows


def unit_code(props):
    code = props["ADM0_A3"]
    if code in PARENT_UNIT:
        return PARENT_UNIT[code]
    iso = props.get("ISO_A3_EH")
    return iso if iso and iso != "-99" else code


def name_index(features):
    # Fields in priority order, so a dependency never claims its sovereign's name.
    index = {}
    fields = ["NAME", "NAME_LONG", "ADMIN", "NAME_EN", "FORMAL_EN", "NAME_SORT",
              "NAME_CIAWF", "BRK_NAME"]
    for field in fields:
        for feature in features:
            props = feature["properties"]
            if props.get(field):
                index.setdefault(norm(props[field]), unit_code(props))
    return index


def equal_earth(lon, lat):
    a1, a2, a3, a4 = 1.340264, -0.081106, 0.000893, 0.003796
    m = math.sqrt(3) / 2
    lam, phi = np.radians(lon), np.radians(lat)
    theta = np.arcsin(m * np.sin(phi))
    t2, t6 = theta ** 2, theta ** 6
    x = lam * np.cos(theta) / (m * (a1 + 3 * a2 * t2 + t6 * (7 * a3 + 9 * a4 * t2)))
    y = theta * (a1 + a2 * t2 + t6 * (a3 + a4 * t2))
    return x, y


def simplify(points, tolerance):
    """Ramer-Douglas-Peucker on an (n, 2) array of projected points."""
    if len(points) < 4:
        return points
    keep = np.zeros(len(points), dtype=bool)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        start, end = stack.pop()
        if end <= start + 1:
            continue
        seg = points[end] - points[start]
        rel = points[start + 1:end] - points[start]
        length = np.hypot(*seg)
        if length == 0:
            dist = np.hypot(rel[:, 0], rel[:, 1])
        else:
            dist = np.abs(seg[0] * rel[:, 1] - seg[1] * rel[:, 0]) / length
        idx = int(np.argmax(dist))
        if dist[idx] > tolerance:
            mid = start + 1 + idx
            keep[mid] = True
            stack.extend([(start, mid), (mid, end)])
    return points[keep]


def build_paths(features, scale, x0, y0):
    shapes = {}
    for feature in features:
        props = feature["properties"]
        if props["ADM0_A3"] == "ATA":
            continue
        geom = feature["geometry"]
        polygons = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
        parts = []
        for polygon in polygons:
            for ring in polygon:
                coords = np.asarray(ring, dtype=float)
                coords = coords[coords[:, 1] >= MIN_LAT]
                if len(coords) < 3:
                    continue
                x, y = equal_earth(coords[:, 0], coords[:, 1])
                pts = np.column_stack([(x - x0) * scale, (y0 - y) * scale])
                pts = simplify(pts, SIMPLIFY_PX)
                if len(pts) < 3:
                    continue
                span = pts.max(axis=0) - pts.min(axis=0)
                if span[0] < 0.6 and span[1] < 0.6:
                    continue
                d = "M" + "L".join(f"{px:.1f},{py:.1f}" for px, py in pts) + "Z"
                parts.append(d)
        shape = shapes.setdefault(unit_code(props), {"name": props["NAME_LONG"], "d": [], "dot": None})
        shape["d"].extend(parts)
        if not parts and shape["dot"] is None:
            # Too small to draw at this scale; keep a marker at the label point.
            lx, ly = equal_earth(np.array([props["LABEL_X"]]), np.array([props["LABEL_Y"]]))
            shape["dot"] = [round(float((lx[0] - x0) * scale), 1), round(float((y0 - ly[0]) * scale), 1)]
    return shapes


def classify(value):
    for i, edge in enumerate(BREAKS):
        if value < edge:
            return i
    return len(BREAKS)


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--cache", default=str(ROOT / ".cache" / "gbd"))
    args = parser.parse_args()
    cache = Path(args.cache)

    doc = fitz.open(fetch(APPENDIX_URL, cache / "rudd2020_appendix.pdf"))
    boundaries = json.loads(fetch(BOUNDARY_URL, cache / "ne_50m_admin_0_countries.geojson").read_text(encoding="utf-8"))
    features = boundaries["features"]

    levels = read_levels(doc)
    rows = read_mortality(doc, levels)
    countries = [r for r in rows if r["level"] == 3]
    index = name_index(features)
    unmatched = []
    for row in countries:
        key = norm(row["location"])
        row["iso_a3"] = ALIASES.get(key) or index.get(key)
        if not row["iso_a3"]:
            unmatched.append(row["location"])

    data_dir = ROOT / "data"
    public_dir = ROOT / "public" / "data"
    data_dir.mkdir(exist_ok=True)
    public_dir.mkdir(parents=True, exist_ok=True)
    fields = ["location", "iso_a3", "asmr_2017", "asmr_lower", "asmr_upper",
              "deaths_2017", "deaths_lower", "deaths_upper", "asmr_change_1990_2017"]
    with open(public_dir / "gbd2017_sepsis_mortality.csv", "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(sorted(countries, key=lambda r: r["location"]))

    # Projection frame from the full extent above MIN_LAT.
    xs, ys = equal_earth(np.array([-180.0, 180.0, 0.0, 0.0]), np.array([0.0, 0.0, 90.0, MIN_LAT]))
    scale = WIDTH / (xs[1] - xs[0])
    height = (ys[2] - ys[3]) * scale
    shapes = build_paths(features, scale, xs[0], ys[2])

    by_code = {r["iso_a3"]: r for r in countries if r["iso_a3"]}
    out = []
    for code, shape in sorted(shapes.items()):
        row = by_code.get(code)
        if not shape["d"] and not row:
            continue
        unit = {
            "id": code,
            "name": row["location"] if row else shape["name"],
            "value": row["asmr_2017"] if row else None,
            "lower": row["asmr_lower"] if row else None,
            "upper": row["asmr_upper"] if row else None,
            "bin": classify(row["asmr_2017"]) if row else None,
        }
        if shape["d"]:
            unit["d"] = "".join(shape["d"])
        else:
            unit["dot"] = shape["dot"]
        out.append(unit)

    payload = {
        "width": WIDTH,
        "height": round(height, 1),
        "labels": LABELS,
        "source": "Rudd KE, et al. Lancet 2020; 395: 200-11 (GBD 2017), eTable 11. CC BY 4.0.",
        "countries": out,
    }
    (data_dir / "sepsis_map.json").write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")

    unmapped = sorted(r["location"] for r in countries if r["iso_a3"] and r["iso_a3"] not in shapes)
    dots = sorted(o["name"] for o in out if "dot" in o)
    print(f"countries parsed: {len(countries)}")
    print(f"unmatched names: {unmatched}")
    print(f"no Natural Earth unit: {unmapped}")
    print(f"drawn as markers: {dots}")
    print(f"map units: {len(out)}, without estimate: {sorted(o['name'] for o in out if o['value'] is None)}")
    print(f"map.json size: {(data_dir / 'sepsis_map.json').stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
