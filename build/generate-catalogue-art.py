"""Procedural catalogue art for the Owlet storefront.

Flat illustrations drawn with Pillow on a 1000x1000 design grid, supersampled 3x
and downsampled, so every image in the catalogue is generated here and nothing is
downloaded. One archetype per dish shape; the palette is shared so the grid reads
as one set.
"""
import os, re, sys, random
from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from catalogue import PRODUCTS

G = 1000            # design grid
SS = 3              # supersample
OUT_SIZE = 512
S = G * SS

INK = (62, 50, 40)
OUT = int(4.5 * SS)

CREAM = (247, 242, 233)
PLATE = (255, 253, 248)
PLATE_RIM = (231, 222, 206)

CHICKEN = (205, 141, 74)
CHICKEN_D = (178, 115, 56)
CRUST = (219, 163, 92)
GLAZE = (188, 106, 52)
BUN = (228, 183, 118)
BUN_D = (203, 155, 93)
LETTUCE = (126, 166, 92)
TOMATO = (198, 87, 64)
CHEESE = (242, 188, 62)
GRAIN = (234, 221, 190)
SQUASH = (224, 150, 63)
FRY = (241, 194, 92)
CARTON = (199, 82, 64)
CORN = (243, 201, 70)
BEAN = (182, 84, 48)
CREAMY = (249, 243, 232)
CHERRY = (199, 62, 76)
CHOC = (109, 70, 43)
CARAMEL = (203, 141, 64)
COOKIE = (178, 124, 68)
COLA = (76, 47, 37)
CUP = (224, 218, 207)
LID = (200, 192, 179)
WATER = (170, 204, 217)
MUG = (141, 96, 62)
BOX = (199, 82, 64)
BOXBAND = (247, 242, 233)
GREEN = (112, 152, 82)
SEED = (150, 118, 74)

TINT = {
    1: (227, 216, 193),
    4: (238, 212, 194),
    5: (226, 226, 203),
    6: (240, 213, 216),
    7: (204, 224, 230),
}


def sc(v):
    return v * SS


def box(x0, y0, x1, y1):
    return [sc(x0), sc(y0), sc(x1), sc(y1)]


def ell(d, x0, y0, x1, y1, fill, outline=INK, width=None):
    d.ellipse(box(x0, y0, x1, y1), fill=fill, outline=outline,
              width=OUT if width is None else width)


def rrect(d, x0, y0, x1, y1, r, fill, outline=INK, width=None):
    d.rounded_rectangle(box(x0, y0, x1, y1), radius=sc(r), fill=fill, outline=outline,
                        width=OUT if width is None else width)


def poly(d, pts, fill, outline=INK, width=None):
    d.polygon([(sc(x), sc(y)) for x, y in pts], fill=fill, outline=outline,
              width=OUT if width is None else width)


def pie(d, x0, y0, x1, y1, a0, a1, fill, outline=INK, width=None):
    d.pieslice(box(x0, y0, x1, y1), a0, a1, fill=fill, outline=outline,
               width=OUT if width is None else width)


def chord(d, x0, y0, x1, y1, a0, a1, fill, outline=INK, width=None):
    d.chord(box(x0, y0, x1, y1), a0, a1, fill=fill, outline=outline,
            width=OUT if width is None else width)


def line(d, pts, fill, w):
    d.line([(sc(x), sc(y)) for x, y in pts], fill=fill, width=int(sc(w)), joint="curve")


# ---------------------------------------------------------------- components

def plate(d, cy=640, w=740, h=240):
    ell(d, 500 - w / 2, cy - h / 2, 500 + w / 2, cy + h / 2, PLATE)
    ell(d, 500 - w / 2 + 46, cy - h / 2 + 15, 500 + w / 2 - 46, cy + h / 2 - 15,
        None, PLATE_RIM, int(3.2 * SS))


def piece(d, cx, cy, w, h, fill=CHICKEN, rot_seed=0):
    """A roast piece: rounded blob with a lighter crust highlight."""
    ell(d, cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2, fill)
    ell(d, cx - w * 0.30, cy - h * 0.34, cx + w * 0.10, cy - h * 0.02, CRUST, None)


def wing(d, cx, cy, s=1.0):
    ell(d, cx - 52 * s, cy - 34 * s, cx + 38 * s, cy + 34 * s, GLAZE)
    ell(d, cx + 18 * s, cy - 16 * s, cx + 62 * s, cy + 20 * s, CHICKEN)


def fillet(d, cx, cy, w=180, h=74):
    rrect(d, cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2, h / 2, CRUST)
    line(d, [(cx - w * 0.28, cy - 6), (cx + w * 0.26, cy - 6)], CHICKEN_D, 7)


def nugget(d, cx, cy, s=1.0):
    rrect(d, cx - 46 * s, cy - 34 * s, cx + 46 * s, cy + 34 * s, 22 * s, CRUST)


def mound(d, cx, cy, w, h, fill):
    chord(d, cx - w / 2, cy - h, cx + w / 2, cy + h, 180, 360, fill)


def bowl(d, cx=500, cy=610, w=600, h=330, fill=PLATE):
    chord(d, cx - w / 2, cy - h, cx + w / 2, cy + h, 0, 180, fill)
    ell(d, cx - w / 2, cy - h * 0.20, cx + w / 2, cy + h * 0.20, None, INK, OUT)


def cup(d, cx=500, top=330, bot=790, tw=300, bw=210, body=CUP, drink=None, lid=True,
        straw=None):
    poly(d, [(cx - tw / 2, top), (cx + tw / 2, top), (cx + bw / 2, bot), (cx - bw / 2, bot)], body)
    if drink:
        poly(d, [(cx - tw / 2 + 26, top + 90), (cx + tw / 2 - 26, top + 90),
                 (cx + bw / 2 - 20, bot - 30), (cx - bw / 2 + 20, bot - 30)], drink, None)
    if lid:
        rrect(d, cx - tw / 2 - 22, top - 56, cx + tw / 2 + 22, top + 6, 16, LID)
    if straw:
        poly(d, [(cx + 30, top - 250), (cx + 76, top - 250), (cx + 52, top - 40),
                 (cx + 18, top - 40)], straw)
    ell(d, cx - bw / 2 - 4, bot - 34, cx + bw / 2 + 4, bot + 34, body)


def scene(tint, extra_disc=True):
    img = Image.new("RGB", (S, S), CREAM)
    d = ImageDraw.Draw(img)
    if extra_disc:
        d.ellipse(box(118, 118, 882, 882), fill=tint)
    return img, d


# ---------------------------------------------------------------- archetypes

def a_bowl_grain(d):
    mound(d, 500, 552, 600, 190, GRAIN)
    for x, y, r, c in [(352, 486, 52, SQUASH), (452, 448, 46, GREEN), (566, 456, 50, SQUASH),
                       (656, 494, 44, CORN), (500, 508, 40, GREEN)]:
        ell(d, x - r, y - r * 0.8, x + r, y + r * 0.8, c)
    for x, y in [(404, 526), (496, 500), (600, 522), (306, 534)]:
        ell(d, x - 13, y - 9, x + 13, y + 9, SEED, None)
    bowl(d, 500, 566, 660, 330)


def a_bowl_chicken(d):
    mound(d, 500, 552, 600, 180, GRAIN)
    for x, y in [(388, 476), (500, 442), (612, 476)]:
        fillet(d, x, y, 150, 66)
    for x, y, r, c in [(330, 518, 44, GREEN), (670, 518, 44, CORN)]:
        ell(d, x - r, y - r * 0.8, x + r, y + r * 0.8, c)
    bowl(d, 500, 566, 660, 330)


def _burger(d, layers):
    """Stacked bands with a deliberate overlap, so the fillings touch."""
    cur = 720                                    # top edge of the bottom bun
    rrect(d, 236, cur, 764, cur + 86, 34, BUN_D)
    for kind in layers:
        if kind == "fillet":
            rrect(d, 246, cur - 62, 754, cur + 8, 34, CRUST)
            cur -= 54
        elif kind == "cheese":
            poly(d, [(268, cur - 34), (732, cur - 34), (772, cur + 20), (228, cur + 20)], CHEESE)
            cur -= 38
        elif kind == "tomato":
            ell(d, 300, cur - 66, 700, cur + 6, TOMATO)
            cur -= 58
        elif kind == "lettuce":
            top = cur - 48
            pts = [(238, top), (762, top)]
            n = 12
            for i in range(n, -1, -1):
                x = 238 + i * (524 / n)
                pts.append((x, cur + (20 if i % 2 == 0 else -6)))
            poly(d, pts, LETTUCE)
            cur -= 44
    chord(d, 214, cur - 106, 786, cur + 118, 180, 360, BUN)
    for sx, sy in [(392, cur - 44), (500, cur - 66), (608, cur - 40), (444, cur - 12),
                   (556, cur - 14)]:
        ell(d, sx - 16, sy - 11, sx + 16, sy + 11, (246, 234, 212), None)


def a_burger(d):
    _burger(d, ["fillet", "tomato", "lettuce"])


def a_burger_double(d):
    _burger(d, ["fillet", "cheese", "fillet", "lettuce"])


def a_nuggets(d):
    plate(d, cy=660, w=720, h=230)
    for cx, cy in [(400, 566), (520, 548), (640, 574), (452, 640), (580, 636), (500, 606)]:
        nugget(d, cx, cy, 1.0)
    ell(d, 300, 590, 400, 668, (232, 224, 208))
    ell(d, 316, 604, 384, 654, GLAZE, None)


def a_plate_roast(d):
    plate(d, cy=650, w=760, h=250)
    piece(d, 430, 566, 250, 168)
    piece(d, 600, 626, 240, 160)
    for i in range(5):
        rrect(d, 300 + i * 22, 660 - i * 6, 322 + i * 22, 754 - i * 6, 10, FRY)


def a_plate_fillet(d):
    plate(d, cy=650, w=760, h=250)
    fillet(d, 430, 570, 300, 104)
    fillet(d, 560, 646, 300, 104)
    ell(d, 640, 528, 760, 620, (232, 224, 208))
    ell(d, 656, 544, 744, 604, GLAZE, None)


def a_plate_sampler(d):
    plate(d, cy=650, w=780, h=260)
    piece(d, 386, 560, 220, 152)
    fillet(d, 610, 566, 220, 82)
    wing(d, 430, 676, 1.1)
    wing(d, 600, 690, 1.1)


def _box(d, cx=500, top=380, bot=790, tw=520, bw=380, band=True):
    poly(d, [(cx - tw / 2, top), (cx + tw / 2, top), (cx + bw / 2, bot), (cx - bw / 2, bot)], BOX)
    if band:
        poly(d, [(cx - tw / 2 + 24, top + 130), (cx + tw / 2 - 24, top + 130),
                 (cx + bw / 2 - 12, top + 250), (cx - bw / 2 + 12, top + 250)], BOXBAND, None)
    ell(d, cx - tw / 2, top - 52, cx + tw / 2, top + 52, BOX)
    ell(d, cx - tw / 2 + 30, top - 30, cx + tw / 2 - 30, top + 30, (176, 68, 52), None)


def a_box_small(d):
    for x, y in [(404, 362), (596, 366)]:
        piece(d, x, y, 176, 120)
    fillet(d, 500, 322, 200, 76)
    wing(d, 442, 400, 0.95)
    wing(d, 564, 404, 0.95)
    _box(d, top=418, bot=760, tw=420, bw=318)


def a_box_family(d):
    for x, y in [(344, 344), (474, 286), (612, 336), (410, 392), (556, 396), (676, 372)]:
        piece(d, x, y, 200, 134)
    _box(d, top=430, bot=830, tw=620, bw=452)


def a_box_grill(d):
    for x, y in [(376, 330), (508, 292), (628, 332)]:
        piece(d, x, y, 186, 126)
    wing(d, 404, 384, 1.05)
    wing(d, 528, 392, 1.05)
    wing(d, 640, 380, 1.05)
    _box(d, top=414, bot=798, tw=520, bw=386)


def a_box_dips(d):
    for x, y in [(392, 320), (500, 292), (608, 322)]:
        fillet(d, x, y, 196, 78)
    _box(d, top=384, bot=772, tw=500, bw=372)
    for i, c in enumerate([GLAZE, CHERRY, CORN, GREEN]):
        x = 262 + i * 160
        ell(d, x - 56, 796, x + 56, 872, (234, 227, 212))
        ell(d, x - 40, 808, x + 40, 860, c, None)


def a_platter(d):
    ell(d, 76, 470, 924, 862, PLATE)
    ell(d, 122, 494, 878, 838, None, PLATE_RIM, int(3.2 * SS))
    piece(d, 292, 574, 214, 146)
    piece(d, 500, 542, 214, 146)
    piece(d, 708, 574, 214, 146)
    fillet(d, 360, 664, 224, 82)
    fillet(d, 646, 664, 224, 82)
    wing(d, 300, 754, 1.0)
    wing(d, 500, 764, 1.0)
    wing(d, 700, 754, 1.0)
    for i in range(6):
        rrect(d, 458 + i * 22, 646 - i * 5, 478 + i * 22, 726 - i * 5, 9, FRY)


def a_fries(d):
    for i in range(7):
        x = 344 + i * 46
        h = 240 + (60 if i in (2, 3, 4) else 0) + (i % 3) * 22
        rrect(d, x, 620 - h, x + 42, 700, 14, FRY)
    poly(d, [(322, 588), (678, 588), (632, 856), (368, 856)], CARTON)
    poly(d, [(348, 660), (652, 660), (636, 760), (364, 760)], BOXBAND, None)


def a_corn(d):
    plate(d, cy=720, w=700, h=200)
    rrect(d, 236, 512, 764, 700, 94, CORN)
    for r in range(4):
        for c in range(11):
            x = 274 + c * 46 + (23 if r % 2 else 0)
            y = 548 + r * 42
            if 250 < x < 750:
                ell(d, x - 16, y - 14, x + 16, y + 14, (232, 179, 53), None)
    rrect(d, 156, 578, 250, 634, 26, (208, 172, 100))
    poly(d, [(736, 520), (860, 452), (836, 560), (752, 606)], (150, 178, 104))


def a_bites(d):
    plate(d, cy=680, w=700, h=220)
    random.seed(7)
    for cx, cy in [(392, 566), (476, 540), (566, 558), (640, 592), (420, 628),
                   (512, 616), (600, 646), (474, 680), (556, 700)]:
        rrect(d, cx - 40, cy - 30, cx + 40, cy + 30, 18, CRUST)


def a_beans(d):
    mound(d, 500, 588, 540, 140, BEAN)
    for cx, cy in [(376, 552), (452, 518), (540, 512), (618, 548), (414, 578),
                   (500, 560), (586, 580), (500, 604)]:
        ell(d, cx - 36, cy - 24, cx + 36, cy + 24, (208, 122, 78), None)
    bowl(d, 500, 600, 600, 310, PLATE)


def a_salad(d):
    mound(d, 500, 570, 580, 150, GREEN)
    for cx, cy, r, c in [(392, 516, 44, (146, 180, 106)), (492, 486, 50, (134, 172, 96)),
                         (604, 518, 44, (146, 180, 106)), (330, 560, 38, (134, 172, 96)),
                         (664, 556, 38, (146, 180, 106))]:
        ell(d, cx - r, cy - r * 0.72, cx + r, cy + r * 0.72, c, None)
    for cx, cy in [(438, 540), (566, 546)]:
        ell(d, cx - 30, cy - 24, cx + 30, cy + 24, TOMATO)
    for cx, cy in [(500, 566), (388, 574), (614, 578)]:
        ell(d, cx - 16, cy - 12, cx + 16, cy + 12, CORN, None)
    bowl(d, 500, 596, 640, 320, PLATE)


def _sundae(d, sauce, crumb=None):
    poly(d, [(378, 520), (622, 520), (588, 852), (412, 852)], (238, 233, 222))
    ell(d, 412, 826, 588, 878, (238, 233, 222))
    for i, (cx, cy, r) in enumerate([(500, 470, 118), (500, 400, 96), (500, 340, 74)]):
        ell(d, cx - r, cy - r * 0.72, cx + r, cy + r * 0.72, CREAMY)
    ell(d, 470, 268, 530, 320, CREAMY)
    poly(d, [(392, 452), (608, 452), (596, 492), (404, 492)], sauce, None)
    ell(d, 404, 396, 596, 452, sauce, None)
    if crumb:
        for cx, cy in [(432, 424), (500, 408), (566, 428), (466, 448), (534, 446)]:
            ell(d, cx - 11, cy - 9, cx + 11, cy + 9, crumb, None)


def a_sundae_cherry(d):
    _sundae(d, CHERRY)
    ell(d, 476, 236, 524, 280, CHERRY)


def a_sundae_chocolate(d):
    _sundae(d, CHOC, crumb=(84, 54, 34))


def a_shake(d):
    cup(d, 500, top=380, bot=846, tw=310, bw=222, body=CUP, drink=CARAMEL, lid=False,
        straw=CHERRY)
    ell(d, 358, 306, 642, 424, CREAMY)
    ell(d, 400, 288, 600, 372, CREAMY)
    poly(d, [(392, 336), (608, 336), (592, 372), (408, 372)], CARAMEL, None)
    rrect(d, 556, 268, 604, 340, 12, COOKIE)


def a_cookies(d):
    plate(d, cy=690, w=700, h=210)
    for i, (cx, cy) in enumerate([(392, 618), (560, 604), (470, 700), (630, 690)]):
        ell(d, cx - 106, cy - 76, cx + 106, cy + 76, COOKIE)
        for dx, dy in [(-44, -18), (12, -32), (48, 6), (-16, 24), (24, 40)]:
            ell(d, cx + dx - 15, cy + dy - 11, cx + dx + 15, cy + dy + 11, CHOC, None)


def _drink_cup(d, drink, straw):
    cup(d, 500, top=356, bot=838, tw=316, bw=224, body=CUP, drink=drink, lid=True, straw=straw)


def a_cup_cola(d):
    _drink_cup(d, COLA, (238, 233, 222))


def a_cup_cola_light(d):
    _drink_cup(d, (96, 66, 54), (170, 204, 217))


def a_cup_citrus(d):
    _drink_cup(d, (233, 214, 120), (126, 166, 92))
    ell(d, 300, 620, 400, 712, (238, 226, 140))


def a_cup_berry(d):
    _drink_cup(d, (140, 74, 116), (199, 62, 76))


def a_bottle_water(d):
    rrect(d, 396, 300, 604, 356, 20, (206, 216, 220))
    poly(d, [(410, 356), (590, 356), (632, 456), (632, 830), (368, 830), (368, 456)], WATER)
    rrect(d, 384, 520, 616, 620, 22, BOXBAND, None)
    line(d, [(414, 470), (414, 790)], (222, 238, 244), 16)


def a_mug_hot(d):
    ell(d, 596, 520, 782, 690, None, INK, OUT)
    poly(d, [(300, 470), (700, 470), (660, 830), (340, 830)], MUG)
    ell(d, 300, 424, 700, 516, MUG)
    ell(d, 334, 442, 666, 500, CHOC, None)
    ell(d, 452, 448, 566, 492, CREAMY, None)
    for x in (430, 500, 570):
        line(d, [(x, 380), (x + 22, 330), (x - 12, 286)], (214, 205, 190), 12)


ARCH = {name[2:]: fn for name, fn in list(globals().items()) if name.startswith("a_")}


def render(archetype, type_id):
    img, d = scene(TINT[type_id])
    ARCH[archetype](d)
    shadow = Image.new("L", (S, S), 0)
    sd = ImageDraw.Draw(shadow)
    sd.ellipse(box(250, 830, 750, 906), fill=70)
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=int(10 * SS)))
    img.paste(Image.new("RGB", (S, S), (120, 104, 86)), (0, 0), shadow)
    return img.resize((OUT_SIZE, OUT_SIZE), Image.LANCZOS)


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower().replace("'", "")).strip("-")


if __name__ == "__main__":
    outdir = sys.argv[1] if len(sys.argv) > 1 else "."
    os.makedirs(outdir, exist_ok=True)
    sheet = Image.new("RGB", (OUT_SIZE * 6, OUT_SIZE * 5), (255, 255, 255))
    for i, (name, desc, price, tid, arch) in enumerate(PRODUCTS):
        im = render(arch, tid)
        im.save(os.path.join(outdir, slug(name) + ".jpg"), quality=86, optimize=True,
                progressive=True)
        sheet.paste(im, ((i % 6) * OUT_SIZE, (i // 6) * OUT_SIZE))
    if os.environ.get("SHEET"):
        sheet.resize((OUT_SIZE * 2, OUT_SIZE * 5 // 3), Image.LANCZOS).save("_sheet.png")
    print("wrote", len(PRODUCTS), "images to", outdir)
