Sleep for specified time.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-sleep),
🌐 [Web](https://www.npmjs.com/package/extra-sleep.web),
🐚 [Shell](https://www.npmjs.com/package/extra-sleep.sh),
📜 [Files](https://unpkg.com/extra-sleep/),
📰 [Docs](https://nodef.github.io/extra-sleep/),
📘 [Wiki](https://github.com/nodef/extra-sleep/wiki/).

[sleep] is a command in *Unix-like* operating systems that **suspends program**
**execution** for specified time. This provides both a **synchronous** and an
**asynchronous** method for sleeping **without** doing a *busy wait*. The
*synchronous* sleep is achieved using [Atomics.wait()] ([1]), and the
*asynchronous* one is achived using *Promisified* [setTimeout()].

This package is available in *Node.js* and *Web* formats. To use it on the web,
simply use the `extra_sleep` global variable after loading with a `<script>`
tag from the [jsDelivr CDN].

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

[sleep]: https://github.com/nodef/extra-sleep/wiki/sleep
[Atomics.wait()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait
[setTimeout()]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
[jsDelivr CDN]: https://cdn.jsdelivr.net/npm/extra-sleep.web/index.js
[1]: https://www.npmjs.com/package/sleep


<br>

```javascript
const {sleep} = require('extra-sleep');
// import {sleep} from "extra-sleep";
// import {sleep} from "https://unpkg.com/extra-sleep/index.mjs"; (deno)


async function main() {
  console.log('Turn on Alarm');
  await sleep(1000);
  console.log('Turn on Shower');
}
main();
```

<br>
<br>


## Index

| Property | Description |
|  ----  |  ----  |
| [sleep] | Sleep for specified time (async). |
| [sleepSync] | Sleep for specified time. |

<br>
<br>


## References

- [Sleep (Unix): Wikipedia](https://en.wikipedia.org/wiki/Sleep_(Unix))
- [sleep package by Erik Dubbelboer](https://www.npmjs.com/package/sleep)
- [setTimeout(): MDN Web docs](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [Atomics.wait(): MDN Web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait)


<br>
<br>

[![](https://img.youtube.com/vi/rCSCPujLs14/maxresdefault.jpg)](https://www.youtube.com/watch?v=rCSCPujLs14)
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
[![DOI](https://zenodo.org/badge/479976846.svg)](https://zenodo.org/badge/latestdoi/479976846)
[![Coverage Status](https://coveralls.io/repos/github/nodef/extra-sleep/badge.svg?branch=master)](https://coveralls.io/github/nodef/extra-sleep?branch=master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6b49dadb0d8ee557b056/test_coverage)](https://codeclimate.com/github/nodef/extra-sleep/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b49dadb0d8ee557b056/maintainability)](https://codeclimate.com/github/nodef/extra-sleep/maintainability)


[sleep]: https://github.com/nodef/extra-sleep/wiki/sleep
[sleepSync]: https://github.com/nodef/extra-sleep/wiki/sleepSync
