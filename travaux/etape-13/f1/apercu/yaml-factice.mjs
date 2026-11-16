// Faux paquet « yaml » pour l'aperçu local : lecture par Python (PyYAML), dates rendues en texte ISO comme en YAML 1.2.
import { execFileSync } from 'node:child_process';
const PY = 'import yaml,json,sys,datetime\nd=yaml.safe_load(sys.stdin.read())\nprint(json.dumps(d, default=lambda o: o.isoformat() if isinstance(o,(datetime.date,datetime.datetime)) else str(o), ensure_ascii=False))';
export const parse = (texte) => JSON.parse(execFileSync('python3', ['-c', PY], { input: texte, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }));
export const stringify = (v) => JSON.stringify(v, null, 2);
export default { parse, stringify };
