import * as fs   from "fs";
import * as path from "path";
import * as cp   from "child_process";
import {sleep}   from "./"


const NAME      = "extra-sleep";
const RQUANTITY = /([\d\.e+-]+)\s*(\w+)?/gi;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR   = 60 * MINUTE;
const DAY    = 24 * HOUR;
const UNIT_FACTOR = new Map([
  ["s", SECOND],
  ["m", MINUTE],
  ["h", HOUR],
  ["d", DAY],
]);


function readFile(pth: string): string {
  var txt = fs.readFileSync(pth, "utf8");
  return txt.replace(/\r?\n/g, "\n");
}


async function sleepQuantity(n: number, factor: number): Promise<void> {
  var ni = Math.floor(n);
  var nf = n - ni;
  for (var i=0; i<ni; i++)
    await sleep(factor);
  if (nf>0) await sleep(Math.round(nf*factor));
}

async function sleepQuantities(quantities: [number, number][]): Promise<void> {
  for (var [n, factor] of quantities)
    await sleepQuantity(n, factor);
}


function parseQuantities(txt: string, o: any): [number, number][] {
  var a = [], m = null;
  while ((m = RQUANTITY.exec(txt)) != null) {
    var n      = parseFloat(m[1]);
    var unit   = (m[2] || "").charAt(0).toLowerCase();
    var factor = UNIT_FACTOR.get(unit) || 1;
    if (!Number.isFinite(n) || !Number.isFinite(factor) || n < 0)
      o.error = `invalid time interval ‘${m[0]}’`;
    a.push([n, factor]);
  }
  return a;
}

function parseOption(o: any, k: string, a: string[], i: number): number {
  if (k==="--help") o.help = true;
  else if (k==="--version") o.version = true;
  else if (k.startsWith("-")) o.error = `unknown option -- ${k}`;
  else o.value.push(a[i]);
  return i++;
}


function showHelp(): void {
  var pth = path.join(__dirname, "README.md");
  try { cp.execSync(`less "${pth}"`); }
  catch (e) {
    try { cp.execSync(`more "${pth}"`); }
    catch (e) { console.log(readFile(pth)); }
  }
}

function showVersion(): void {
  var pth = path.join(__dirname, "package.json");
  var {version} = JSON.parse(readFile(pth));
  console.log(`v${version}`);
}

function showError(msg: string): void {
  console.error(`${NAME}: ${msg}`);
  console.error(`Try "${NAME} --help" for more information.`);
}


async function main(a: string[]): Promise<void> {
  var o = {help: false, version: false, error: null, value: []};
  for (var i=2; i<a.length;)
    i = parseOption(o, a[i], a, i);
  if (o.help) return showHelp();
  else if (o.version) return showVersion();
  if (o.error) return showError(o.error);
  var values = o.value.join(" ");
  var quantities = parseQuantities(values, o);
  if (o.error) return showError(o.error);
  await sleepQuantities(quantities);
}
main(process.argv);
