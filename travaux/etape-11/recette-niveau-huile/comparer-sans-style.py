import sys,os,re,difflib
a,b=sys.argv[1],sys.argv[2]
def lire(p):
    s=open(p,encoding='utf8',errors='replace').read()
    return re.sub(r'<style[^>]*>.*?</style>','<style>…</style>',s,flags=re.S)
styles=set()
for racine,_,fichiers in os.walk(b):
    for f in fichiers:
        pb=os.path.join(racine,f); rel=os.path.relpath(pb,b); pa=os.path.join(a,rel)
        if not os.path.exists(pa): print('NOUVEAU',rel); continue
        if open(pa,'rb').read()==open(pb,'rb').read(): continue
        if f.endswith('.html'):
            if lire(pa)==lire(pb): styles.add(rel); continue
            sa,sb=lire(pa),lire(pb)
            # premier écart, en contexte
            i=next(i for i in range(min(len(sa),len(sb))) if sa[i]!=sb[i])
            print('CONTENU',rel,'|',re.sub(r'\s+',' ',sb[max(0,i-120):i+240]))
        else:
            print('AUTRE',rel)
for racine,_,fichiers in os.walk(a):
    for f in fichiers:
        rel=os.path.relpath(os.path.join(racine,f),a)
        if not os.path.exists(os.path.join(b,rel)): print('SUPPRIME',rel)
print('STYLE SEULEMENT :',len(styles),'pages')
