Sleep for specified time.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-sleep),
🌐 [Web](https://www.npmjs.com/package/extra-sleep.web),
🐚 [Shell](https://www.npmjs.com/package/extra-sleep.sh),
📜 [Files](https://unpkg.com/extra-sleep.sh/),
📰 [Docs](https://nodef.github.io/extra-sleep/),
📘 [Wiki](https://github.com/nodef/extra-sleep/wiki/).

[sleep] is a command in *Unix-like* operating systems that **suspends program**
**execution** for specified time. This package provides the `esleep` command,
with a **similar behaviour**. Please check examples below. It should be noted
*small delays* (few milliseconds) are *not accurate*.

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

[sleep]: https://en.wikipedia.org/wiki/Sleep_(Unix)


<br>

```bash
# Install
$ npm install -g extra-sleep.sh
```

<br>

```bash
$ esleep <number>[unit] ... | [option]
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

```bash
# sleep for 0.1 seconds
$ esleep 0.1

# sleep for 1.23 minutes
$ esleep 1.23m

# sleep for 1 day 23 hours
$ esleep 1d 23h
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

[![](https://img.youtube.com/vi/rCSCPujLs14/maxresdefault.jpg)](https://www.youtube.com/watch?v=rCSCPujLs14)
[![DOI](https://zenodo.org/badge/479976846.svg)](https://zenodo.org/badge/latestdoi/479976846)
[![Coverage Status](https://coveralls.io/repos/github/nodef/extra-sleep/badge.svg?branch=master)](https://coveralls.io/github/nodef/extra-sleep?branch=master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6b49dadb0d8ee557b056/test_coverage)](https://codeclimate.com/github/nodef/extra-sleep/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b49dadb0d8ee557b056/maintainability)](https://codeclimate.com/github/nodef/extra-sleep/maintainability)
