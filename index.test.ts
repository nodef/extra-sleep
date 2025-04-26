import {assert} from "jsr:@std/assert";
import {
  sleep,
  sleepSync,
} from "./index.ts";




//#region TEST SLEEP
Deno.test("sleep", async () => {
  const start = Date.now();
  await sleep(1000);
  const stop  = Date.now();
  assert(stop - start >= 1000, "sleep did not sleep long enough");
  assert(stop - start <= 2000, "sleep slept too long");
});


Deno.test("sleepSync", () => {
  const start = Date.now();
  sleepSync(1000);
  const stop  = Date.now();
  assert(stop - start >= 1000, "sleepSync did not sleep long enough");
  assert(stop - start <= 2000, "sleepSync slept too long");
});
//#endregion
