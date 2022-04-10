Sleep for specified time.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-sleep),
🌐 [Web](https://www.npmjs.com/package/extra-sleep.sh.web),
🖥️ [Shell](https://www.npmjs.com/package/extra-sleep.sh),
📜 [Files](https://unpkg.com/extra-sleep/),
📰 [Docs](https://nodef.github.io/extra-sleep/).

This provides both a synchronous and an asynchronous method for sleeping without doing a
busy wait. The synchronous sleep is achieved using [Atomics.wait()] ([1]), and the asynchronous
one is achived using Promisified [setTimeout()].

This package is available in *Node.js*, *Web*, and *Shell* formats. The web format
is exposed as `extra_sleep` standalone variable and can be loaded from
[jsDelivr CDN].

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

[Atomics.wait()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait
[setTimeout()]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
[jsDelivr CDN]: https://cdn.jsdelivr.net/npm/extra-sleep.web/index.js
[1]: https://www.npmjs.com/package/sleep

<br>

```javascript
const fyers = require('extra-sleep');


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
| [exchangeDescription] | Get exchange description. |

<br>
<br>


## References

- [sleep package : Erik Dubbelboer](https://www.npmjs.com/package/sleep)
- [Atomics.wait() : MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait)
- [setTimeout() : MDN](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)


<br>
<br>

[![](https://img.youtube.com/vi/rCSCPujLs14/maxresdefault.jpg)](https://www.youtube.com/watch?v=rCSCPujLs14)
