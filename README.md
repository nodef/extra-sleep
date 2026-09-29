[sleep] is a command in *Unix-like* operating systems that **suspends program** **execution** for specified time. This package provides both a **synchronous** and an **asynchronous** method for sleeping **without** doing a *busy wait*. The *synchronous* sleep is achieved using [Atomics.wait()] ([1]), and the *asynchronous* one is achived using *Promisified* [setTimeout()].

This package also provides a command line tool `xsleep` -- with a **similar behaviour** as [sleep] -- that can be used to sleep for specified time in seconds, minutes, hours, or days. Please check examples below. It should be noted *small delays* (few milliseconds) are *not accurate*.

▌
📦 [JSR](https://jsr.io/@nodef/extra-sleep),
📦 [NPM](https://www.npmjs.com/package/extra-sleep),
📰 [Docs](https://jsr.io/@nodef/extra-sleep/doc).

[sleep]: https://en.wikipedia.org/wiki/Sleep_(Unix)
[Atomics.wait()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait
[setTimeout()]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
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

```bash
# Install CLI tool
$ deno install --global --name xsleep jsr:@nodef/extra-sleep/bin.ts

# Sleep for 0.1 seconds
$ xsleep 0.1

# Sleep for 1.23 minutes
$ xsleep 1.23m

# Sleep for 1 day 23 hours
$ xsleep 1d 23h
```

<br>
<br>


## Index

| Name | Description |
|  ----  |  ----  |
| [sleep] | Sleep for specified time (async). |
| [sleepSync] | Sleep for specified time. |

<br>

```bash
$ xsleep <number>[unit] ... | [option]

# Units:
# s: sleep for number seconds.
# m: sleep for number minutes.
# h: sleep for number hours.
# d: sleep for number days.

# Options:
# --help: get help
# --version: get version details
```

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


[sleep]: https://jsr.io/@nodef/extra-sleep/doc/~/sleep
[sleepSync]: https://jsr.io/@nodef/extra-sleep/doc/~/sleepSync
