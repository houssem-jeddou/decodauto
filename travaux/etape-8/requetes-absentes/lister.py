"""Livrable 8.2 : suggestions et recherches associées absentes de 06, puis liste à mesurer.
Usage, depuis la racine du dépôt : python3 travaux/etape-8/requetes-absentes/lister.py <chemin de 06_base_mots_cles_complete.csv>"""
import unicodedata,re
def norm(s):
    s=unicodedata.normalize('NFD',s.lower()); s=''.join(c for c in s if unicodedata.category(c)!='Mn')
    s=s.replace('œ','oe'); s=re.sub(r"[’'\-]"," ",s); s=re.sub(r"[^a-z0-9 .]"," ",s); return re.sub(r"\s+"," ",s).strip()
import csv,json,re,sys,glob,os
r6=list(csv.DictReader(open(sys.argv[1],encoding='utf-8')))
k6={norm(x['mot_cle']):x for x in r6}
md=open('docs/07_resultats_google_serp_autocompletion.md',encoding='utf-8').read()
sug=md.split('## Suggestions de saisie Google')[1]
out=[]
for line in sug.splitlines():
    m=re.match(r"- \*\*(.+?)\*\* : (.+)",line)
    if not m: continue
    for i,s in enumerate(m.group(2).split(' | ')):
        out.append(('07',m.group(1),i+1,s.strip()))
for f in sorted(glob.glob('travaux/etape-6/releve-google-france/*.json')):
    j=json.load(open(f,encoding='utf-8'))
    for i,s in enumerate(j.get('recherches_associees') or []):
        q=s if isinstance(s,str) else (s.get('requete') or s.get('query') or s.get('texte') or str(s))
        out.append(('FR',os.path.basename(f)[:-5],i+1,q))
seen=set(); lignes=[]
for src,seed,rang,q in out:
    n=norm(q)
    if n in k6 or (src,n) in seen: continue
    seen.add((src,n)); lignes.append(f"{src}\t{seed}\t{rang}\t{q}")
import csv,sys,re,collections
open('travaux/etape-8/requetes-absentes/absentes_de_06.tsv','w',encoding='utf-8').write('\n'.join(lignes)+'\n')
rows=[l.rstrip('\n').split('\t') for l in open('travaux/etape-8/requetes-absentes/absentes_de_06.tsv',encoding='utf-8')]
EXCLU=re.compile(r"voyante|tunis|ariana|autour de moi|daikin|hitachi|machine a laver|voiture neuve|voiture neuf|nemo|new beetle|carte grise|crit air|carburant|fioul|baril|prix essence|prix gasoil|^prix$|passeport|climatisation|permis|cigarette|bsr|divorce|facebook|fortnite|medecin|banque|code pin|nom de famille|whatsapp|velo|nakamura|mahle|frigo|tesla|pape|incendie|trottinette|kukirin|shimano|moto|scooter|fapim|fapagau|desherbant|enfant|leclerc|action|carter cash|norauto|dekra|gratuitement|embrayage|^plaquette de frein|courroie|boite auto|boite de vitesse|^vidange$|bluehdi|ducato|aircross|c3 essence|p0101|p0670|p0113|p0400|tremble|controle technique (prix|moto)|combien coute un controle|diesel 5l|^adblue|land cruiser|rs3")
REGLES=[(r"p0420","code-p0420"),(r"p0087","code-p0087"),(r"p0299","code-p0299"),(r"p0380","code-p0380"),(r"p1351","code-p1351"),
(r"loi montagne","loi-montagne"),(r"prechauffage","voyant-prechauffage"),(r"airbag","voyant-airbag"),(r"abs|qui glisse|zig zag","voyant-abs-esp"),
(r"adblue","voyant-adblue"),(r"voyant.*batterie","voyant-batterie"),(r"volant","voyant-direction"),(r"voyant.*(frein|plaquette)","voyant-frein"),
(r"voyant.*huile","voyant-huile"),(r"voyant.*pression","voyant-pression-pneus"),(r"voyant.*refroidissement|chauffe","surchauffe-moteur"),
(r"voyant moteur|voyant orange voiture moteur|signification moteur","voyant-moteur"),(r"voyant","voyants"),
(r"pression","pression-des-pneus"),(r"puretech","moteur-puretech"),(r"fume|fumee","fumee-echappement"),(r"bruit moteur","bruit-moteur"),
(r"perte de puissance","perte-de-puissance"),(r"demarre","voiture-ne-demarre-pas"),(r"broute","voiture-qui-broute"),(r"fap","nettoyer-fap"),
(r"5w30","huile-5w30"),(r"consomme de l huile","niveau-huile"),(r"liquide de refroidissement","liquide-de-refroidissement"),(r"batterie","batterie-voiture")]
vu={}; exclus=[]
for src,seed,rang,q in rows:
    n=norm(q)
    if EXCLU.search(n): exclus.append(q); continue
    page=next((p for r,p in REGLES if re.search(r,n)),None)
    if page is None: exclus.append(q); continue
    if n in vu: vu[n]['source']+=f" ; {src}:{seed}#{rang}"; continue
    vu[n]={'requete':q.lower().strip(),'page_proposee':page,'source':f"{src}:{seed}#{rang}"}
w=csv.DictWriter(open('travaux/etape-8/requetes-absentes/requetes_a_mesurer.csv','w',encoding='utf-8',newline=''),fieldnames=['requete','page_proposee','source'])
w.writeheader(); [w.writerow(v) for v in sorted(vu.values(),key=lambda v:(v['page_proposee'],v['requete']))]
open('travaux/etape-8/requetes-absentes/requetes_a_mesurer.txt','w',encoding='utf-8').write('\n'.join(v['requete'] for v in sorted(vu.values(),key=lambda v:(v['page_proposee'],v['requete'])))+'\n')
print(len(rows),'absentes ;',len(vu),'à mesurer ;',len(exclus),'écartées')
c=collections.Counter(v['page_proposee'] for v in vu.values()); print(sorted(c.items(),key=lambda x:-x[1]))
open('travaux/etape-8/requetes-absentes/requetes_ecartees.txt','w',encoding='utf-8').write('\n'.join(exclus)+'\n')
