import {sleep}     from "../src";
import {sleepSync} from "../src";




test("sleep", async () => {
  var start = Date.now();
  await sleep(1000);
  var stop  = Date.now();
  expect(stop - start).toBeGreaterThanOrEqual(1000);
  expect(stop - start).toBeLessThanOrEqual(2000);
});


test("sleepSync", () => {
  var start = Date.now();
  sleepSync(1000);
  var stop  = Date.now();
  expect(stop - start).toBeGreaterThanOrEqual(1000);
  expect(stop - start).toBeLessThanOrEqual(2000);
});
