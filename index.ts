/**
 * Sleep for specified time (async).
 * @param ms time in milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


/**
 * Sleep for specified time.
 * @param ms time in milliseconds
 */
export function sleepSync(ms: number): void {
  const buff = new SharedArrayBuffer(4);
  const view = new Int32Array(buff);
  Atomics.wait(view, 0, 0, ms);
}
// - https://www.npmjs.com/package/sleep
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait
