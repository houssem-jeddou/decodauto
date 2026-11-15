"""Polices de titre des trois pistes : une seule graisse par piste, sous-ensemble latin du français, WOFF.
Polices sous licence OFL sans nom réservé (fichiers OFL copiés à côté)."""
from pathlib import Path
import shutil
from fontTools import subset
from fontTools.ttLib import TTFont

SRC = Path("/mnt/skills/examples/canvas-design/canvas-fonts")
DEST = Path("/home/claude/pilote/maquette/fonts")
DEST.mkdir(parents=True, exist_ok=True)
for vieux in DEST.glob("*.woff"):
    vieux.unlink()
POLICES = {"titre-a": ("BricolageGrotesque-Bold.ttf", "BricolageGrotesque-OFL.txt"),
           "titre-b": ("Outfit-Bold.ttf", "Outfit-OFL.txt"),
           "titre-c": ("BigShoulders-Bold.ttf", "BigShoulders-OFL.txt")}
TEXTE = ("".join(chr(c) for c in range(0x20, 0x7F)) + " «»’‘“”–—…€ •→·×°"
         + "àâäçéèêëîïôöùûüÿœæÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸŒÆ")
for nom, (fichier, licence) in POLICES.items():
    opts = subset.Options()
    opts.flavor = "woff"
    opts.layout_features = ["kern", "liga", "calt", "case"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    f = TTFont(SRC / fichier)
    s = subset.Subsetter(opts)
    s.populate(text=TEXTE)
    s.subset(f)
    f.flavor = "woff"
    f.save(DEST / f"{nom}.woff")
    shutil.copy(SRC / licence, DEST / f"{nom}-OFL.txt")
    print(nom, fichier, (DEST / f"{nom}.woff").stat().st_size, "octets")
