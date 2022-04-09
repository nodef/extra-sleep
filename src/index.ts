function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


// https://www.npmjs.com/package/sleep : Erik Dubbelboer
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait
function sleepSync(ms) {
  var buff = new SharedArrayBuffer(4);
  var view = new Int32Array(buff);
  Atomics.wait(view, 0, 0, ms);
}
console.log('Start sleeping.');
sleepSync(1000);
console.log('Done sleeping.');
