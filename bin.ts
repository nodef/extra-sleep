import {sleep}   from "./index.ts";


interface Options {
  help: boolean;
  version: boolean;
  error: string | null;
  value: string[];
};


const NAME      = "extra-sleep";
const VERSION   = "0.0.1";
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


async function sleepQuantity(n: number, factor: number): Promise<void> {
  const ni = Math.floor(n);
  const nf = n - ni;
  for (let i=0; i<ni; i++)
    await sleep(factor);
  if (nf>0) await sleep(Math.round(nf*factor));
}

async function sleepQuantities(quantities: [number, number][]): Promise<void> {
  for (const [n, factor] of quantities)
    await sleepQuantity(n, factor);
}


function parseQuantities(txt: string, o: Options): [number, number][] {
  const a: [number, number][] = []; let m = null;
  while ((m = RQUANTITY.exec(txt)) != null) {
    const n      = parseFloat(m[1]);
    const unit   = (m[2] || "s").charAt(0).toLowerCase();
    const factor = UNIT_FACTOR.get(unit) || 0;
    if (!Number.isFinite(n) || !Number.isFinite(factor) || n < 0 || factor === 0)
      o.error = `invalid time interval ‘${m[0]}’`;
    a.push([n, factor]);
  }
  if (a.length === 0) o.error = `missing operand`;
  return a;
}

function parseOption(o: Options, k: string, a: string[], i: number): number {
  if (k==="--help") o.help = true;
  else if (k==="--version") o.version = true;
  else if (k.startsWith("-")) o.error = `unknown option -- ${k}`;
  else o.value.push(a[i]);
  return i + 1;
}


function showHelp(): void {
  console.error(`Usage: ${NAME} <number>[unit] ... [option]\n\n` +
    `Sleep for specified time.\n\n` +
    `Units:\n` +
    `  s: sleep for number seconds.\n` +
    `  m: sleep for number minutes.\n` +
    `  h: sleep for number hours.\n` +
    `  d: sleep for number days.\n\n` +
    `Options:\n` +
    `  --help: get help\n` +
    `  --version: get version details\n` +
    `\n` +
    `Examples:\n` +
    `  ${NAME} 0.1\n` +
    `  ${NAME} 1.23m\n` +
    `  ${NAME} 1d 23h\n\n`);
}

function showVersion(): void {
  console.log(`v${VERSION}`);
}

function showError(msg: string): void {
  console.error(`${NAME}: ${msg}`);
  console.error(`Try "${NAME} --help" for more information.`);
}


async function main(a: string[]): Promise<void> {
  const o: Options = {help: false, version: false, error: null, value: []};
  for (let i=2; i<a.length;)
    i = parseOption(o, a[i], a, i);
  if (o.help) return showHelp();
  else if (o.version) return showVersion();
  if (o.error) return showError(o.error);
  const values = o.value.join(" ");
  const quantities = parseQuantities(values, o);
  if (o.error) return showError(o.error);
  await sleepQuantities(quantities);
}
main(Deno.args);
