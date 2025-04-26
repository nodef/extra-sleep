[sleep] is a command in *Unix-like* operating systems that **suspends program** **execution** for specified time. This package provides both a **synchronous** and an **asynchronous** method for sleeping **without** doing a *busy wait*. The *synchronous* sleep is achieved using [Atomics.wait()] ([1]), and the *asynchronous* one is achived using *Promisified* [setTimeout()].

▌
📦 [JSR](https://jsr.io/@nodef/extra-sleep),
📰 [Docs](https://jsr.io/@nodef/extra-sleep/doc),

[sleep]: https://github.com/nodef/extra-sleep/wiki/sleep
[Atomics.wait()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait
[setTimeout()]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
[jsDelivr CDN]: https://cdn.jsdelivr.net/npm/extra-sleep.web/index.js
[1]: https://www.npmjs.com/package/sleep

<br>


```javascript
import {sleep, sleepSync} from "jsr:@nodef/extra-sleep";


console.log('Turn on Alarm');
await sleep(1000);
console.log('Turn on Shower');
sleepSync(1e+6);  // And relax!
```

<br>
<br>


## Index

| Name | Description |
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


[![](https://raw.githubusercontent.com/qb40/designs/gh-pages/0/image/11.png)](https://wolfram77.github.io)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-sleep)


[sleep]: https://jsr.io/@nodef/extra-sql/doc/~/sleep
[sleepSync]: https://jsr.io/@nodef/extra-sql/doc/~/sleepSync
