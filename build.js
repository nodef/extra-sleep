const os = require('os');
const {child_process: cp, fs, path} = require('extra-build');
const {git, github, package}        = require('extra-build');
const {javascript, jsdoc, markdown} = require('extra-build');


const owner  = 'nodef';
const srcts  = 'index.ts';
const outjs  = 'index.js';
const outmjs = 'index.mjs';
const outdts = 'index.d.ts';




// Is given file a submodule?
function isSubmodule(pth) {
  if (/^_|index.ts$/.test(pth)) return false;
  if (!/\.ts$/.test(pth)) return false;
  return true;
}


// Get filename keywords for main/sub package.
function filenameKeywords(fil) {
  if (fil !== srcts) return [path.symbolname(fil)];
  return fs.readdirSync('src').filter(isSubmodule).map(path.keywordname);
}


// Get export keywords for main/sub package.
function exportKeywords(fil) {
  var txt  = fs.readFileTextSync(`src/${fil}`);
  var exps = javascript.jsdocSymbols(txt).filter(s => s.export);
  return exps.map(e => path.symbolname(e.name));
}


// Get keywords for main/sub package.
function keywords(fil, add=[]) {
  var m = package.read('.');
  var s = new Set([...m.keywords, ...add, ...filenameKeywords(fil), ...exportKeywords(fil)]);
  return Array.from(s);
}


// Update GitHub details.
function updateGithub() {
  var m = package.read('.');
  var {name, description} = m;
  var homepage  = `https://www.npmjs.com/package/${name}`;
  var topics    = keywords(srcts);
  topics.length = Math.min(topics.length, 20);
  github.updateDetails(owner, name, {description, homepage, topics});
}


// Generate and publish docs.
function publishDocs(fil) {
  var url = git.remoteUrl();
  var cwd = fs.mkdtempSync(path.join(os.tmpdir(), '.docs'));
  cp.execLogSync(`git clone ${url} "${cwd}"`);
  try { cp.execLogSync(`git checkout gh-pages`, {cwd}); }
  catch(e) { git.setupBranch('gh-pages', {cwd}); }
  cp.execLogSync(`typedoc "src/${fil}" --out ".docs"`);
  cp.execLogSync(`rm -rf "${cwd}"/*`);
  cp.execLogSync(`mv ".docs"/* "${cwd}"/`);
  git.commitPush('', {cwd});
  cp.execLogSync(`rm -rf ${cwd}`);
}


// Webify output files.
function webifyMain(sym) {
  cp.execLogSync(`browserify "${outjs}" -o "${outjs}.1" -s ${sym}`);
  cp.execLogSync(`cp "${outmjs}" "${outmjs}.1"`);
  cp.execLogSync(`terser "${outjs}.1" -o "${outjs}"  -c -m`);
  cp.execLogSync(`terser "${outmjs}.1" -o "${outmjs}" -c -m`);
  cp.execLogSync(`rm -f "${outjs}.1"`);
  cp.execLogSync(`rm -f "${outmjs}.1"`);
}


// Generate main output files.
function generateMain(fil, sym) {
  var bld = fil.replace(/\.ts/, '.js');
  var env = sym? ` --environment TYPE:web` : '';
  cp.execLogSync(`rollup -c rollup.config.js -i .build/${bld}` + env);
  if (sym) webifyMain(sym);
}


// Publish root package to NPM, GitHub.
function publishRoot(sym, ver) {
  fs.restoreFileSync('package.json', () => {
    var m = package.read();
    m.version  = ver;
    m.keywords = keywords(srcts);
    m.preferGlobal = undefined;
    m.bin = undefined;
    if (sym) { m.name += '.web'; }
    fs.restoreFileSync('README.md', () => {
      var txt = fs.readFileTextSync('README.md');
      if (sym) txt = txt.replace(/\[Files\]\((.*?)\/\)/g, '[Files]($1.web/)');
      fs.writeFileTextSync('README.md', txt);
      package.write('.', m);
      package.publish('.');
      try { package.publishGithub('.', owner); }
      catch (e) { console.error(e); }
    });
  });
}


// Publish bin package to NPM, GitHub.
function publishBin(sym, ver) {
  fs.restoreFileSync('package.json', () => {
    var m = package.read();
    m.version  = ver;
    m.keywords = keywords(srcts, ['cli', 'command', 'line', 'interface', 'shell', 'bash']);
    m.name += '.sh';
    m.module = undefined;
    m.sideEffects = undefined;
    m.exports = undefined;
    m.keywords = [].
    fs.restoreFileSync('README.md', () => {
      fs.unlinkSync('README.md');
      fs.renameSync('bin.md', 'README.md');
      package.write('.', m);
      package.publish('.');
      try { package.publishGithub('.', owner); }
      catch (e) { console.error(e); }
    });
  });
}


// Deploy root package to NPM, GitHub.
function deployRoot(ver) {
  var m   = package.read();
  var sym = path.symbolname(m.name);
  generateMain(srcts, '');
  publishRoot('', ver);
  generateMain(srcts, sym);
  publishRoot(sym, ver);
  publishBin('', ver);
}


// Deploy root, sub packages to NPM, GitHub.
function deployAll() {
  var m   = package.read();
  var ver = package.nextUnpublishedVersion(m.name, m.version);
  cp.execLogSync(`tsc`);
  updateGithub();
  publishDocs(srcts);
  deployRoot(ver);
  // deploySub(ver);
}


// Process each source file.
function forEachSourceFile(fn) {
  for (var f of fs.readdirSync('src')) {
    if (!/^[A-Z0-9]/i.test(f)) continue;
    var txt = fs.readFileTextSync(`src/${f}`);
    var exps = javascript.exportSymbols(txt);
    var docs = javascript.jsdocSymbols(txt);
    var dmap = new Map(docs.map(x => [x.name, x]));
    fn(f, exps, dmap);
  }
}


// Update index table for README, wiki.
function updateMarkdownIndex(rkind) {
  forEachSourceFile((f, exps, dmap) => {
    var nam = f.replace(/\..*/, '');
    var pre = f === 'index.ts'? '' : nam;
    var out = pre? `wiki/${nam}.md` : 'README.md';
    if (!fs.existsSync(out)) return;
    var txt = fs.readFileTextSync(out);
    txt = markdown.replaceTables(txt, (full, rows) => {
      if (rows.length < 1 || rows[0].length < 2) return full;
      rows = rows.map(r => [r[0].trim(), r[1].trim()]);
      if (!/property/i.test(rows[0][0]))    return full;
      if (!/description/i.test(rows[0][1])) return full;
      var rmap = new Map(rows.map((r, i) => [r[0], i]));
      for (var e of exps) {
        if (!dmap.has(e.name)) continue;
        if (!rkind.test(e.kind)) continue;
        var key  = `[${e.name}]`;
        var val = jsdoc.parse(dmap.get(e.name).jsdoc).description.trim();
        if (!rmap.has(key)) rows.push([key, val]);
        else rows[rmap.get(key)][1] = val;
      }
      var top = '| ' + rows[0].join(' | ') + ' |\n';
      var mid = '| ' + rows[0].map(r => ` ---- `).join(' | ') + ' |\n';
      var bot = rows.slice(1).map(r => '| ' + r.join(' | ') + ' |\n').join('');
      return top + mid + bot;
    });
    fs.writeFileTextSync(out, txt);
  });
}


// Get docs link reference for jsdoc symbol.
function docsLinkReference(sym, pre, repo) {
  var d    = jsdoc.parse(sym.jsdoc);
  var root = `https://${owner}.github.io/${repo}`;
  var name = sym.name;
  var pred = pre? `${pre}.` : '';
  var prem = pre? `modules/${pre}.html` : 'modules.html';
  switch (d.kind) {
    case 'interface': return `[${name}]: ${root}/interfaces/${pred}${name}.html`;
    case 'class':     return `[${name}]: ${root}/classes/${pred}${name}.html`;
    default:          return `[${name}]: ${root}/${prem}#${name}`;
  }
}


// Update link references for README, wiki.
function updateMarkdownLinkReferences() {
  var m = package.read('.');
  forEachSourceFile((f, exps, dmap) => {
    var nam = f.replace(/\..*/, '');
    var pre = f === 'index.ts'? '' : nam;
    var out = pre? `wiki/${nam}.md` : 'README.md';
    if (!fs.existsSync(out)) return;
    var txt = fs.readFileTextSync(out);
    txt = markdown.replaceLinkReferences(txt, (full, name) => {
      if (!dmap.has(name)) return full;
      return docsLinkReference(dmap.get(name), pre, m.name);
    });
    var lset = new Set(markdown.links(txt).filter(x => !x.url).map(x => x.ref || x.name));
    var rset = new Set(markdown.linkReferences(txt).map(x => x.name));
    for (var l of lset) {
      if (rset.has(l)) continue;
      if (!dmap.has(l)) continue;
      txt += docsLinkReference(dmap.get(l), pre, m.name) + '\n';
    }
    fs.writeFileTextSync(out, txt);
  });
}


// Update markdowns README.
function updateMarkdown() {
  updateMarkdownIndex(/const|class|(async\s+)?function\*?/);
  updateMarkdownLinkReferences();
}


function main(a) {
  if (a[2] === 'deploy') deployAll();
  else if (a[2] === 'markdown') updateMarkdown();
  else generateMain(srcts, '');
}
main(process.argv);
