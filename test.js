
const x = 100;
const y = 100;

profess.withCoverage();
profess
  .suite("Test suite")
  .want(5)
  .toBeEqual(3)
  .want("aaa")
  .toBeEqual("aaa")
  .test();

profess
  .suite("weird integer testing")
  .want(1)
  .toBeEqual(1)
  .want(42)
  .toBeEqual(42)
  .test()
  .suite("add more testing")
  .want(true)
  .toBeEqual(false)
  .want(30)
  .toBeInRange(20, 55)
  .want(x)
  .toBeInRange(0, 55)
  .test();
let doesNotExist;
const fun = function() {};
profess
  .want(0)
  .toExist()
  .want(null)
  .toExist()
  .want("")
  .toExist()
  .want(doesNotExist)
  .toExist()
  .want(fun)
  .toBe.Function()
  .want(-0)
  .toBeEqual(+0)
  .want(-0)
  .absolute(+0)
  .test();
profess.suite("Checking types").want(100).toMatchTypes("text").test();

profess.suite("another suite").want(0).toBeEqual(0).test();

profess.want(x).toBeEqual(y).test();
profess.result();

profess.fast(2)(4);
profess.fast(2)("2");
profess.fast(false)(false);
profess.fast(100)(100);
