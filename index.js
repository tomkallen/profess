const profess = {
    withCoverage: function() {
        // statistical data for all the suite
        this._totalFail = 0;
        this._totalSuccess = 0;
        this._covered = true;
        this._totalSuits = 0;
        return this;
    },
    suite: function(description) {
        this._description = description;
        this._result = [];
        this._fail = 0;
        this._success = 0;

        return this;
    },
    want: function(value) {
        this._value = value;
        return this;
    },
    toBeEqual: function(assertion) {
        if (this._value === assertion) {
            this._log(assertion, `${this._value} equals ${assertion}`, true);
        } else {
            this._log(
                assertion,
                `${this._value} to be equal ${assertion}`,
                false
            );
        }
        return this;
    },

    toBeInRange: function(min, max) {
        if (typeof min !== "number" || typeof max !== "number") {
            throw new Error(
                "toBeInRange() method requires two numerical arguments"
            );
        }
        if (this._value >= min && this._value <= max) {
            this._log(
                null,
                `value ${this._value} is in range [${min}-${max}]`,
                true
            );
        } else {
            this._log(
                null,
                `value ${this._value} to be in range ${min}-${max}`,
                false
            );
        }
        return this;
    },

    toMatchTypes: function(assertion) {
        if (typeof this._value !== typeof assertion) {
            this._log(
                assertion,
                `value to have the type "${typeof assertion}", got "${typeof this._value}" instead`
            );
        } else {
            this._log(
                assertion,
                `value has the correct type "${typeof assertion}"`
            );
        }
        return this;
    },

    toExist: function() {
        if (typeof this._value !== "undefined") {
            this._log(null, `value exists and equals ${this._value}`, true);
        } else {
            this._log(null, `value to exist but it is not defined yet`, false);
        }
        return this;
    },

    toBe: {
        Function: function() {
            if (typeof this._value === "function") {
            //    this._typeCheckSuccess("function");
            } else {
            //    this._typeCheckFail("function");
            }
            return this;
        }.bind(this)
    },

    _typeCheckSuccess(T) {
        this._log(null, `value is a ${typeof this._value}`, true);
    },
    _typeCheckFail(T) {
        this._log(
            null,
            `value to be ${T}, got ${typeof this._value} instead`,
            false
        );
    },

    _log: function(assertion, action, result) {
        if (result) {
            this._totalSuccess !== "undefined" ? this._totalSuccess++ : 1;
            this._result.push(`Success: ${action}`);
            return this._success++;
        } else {
            this._totalFail !== "undefined" ? this._totalFail++ : 1;
            this._result.push(`Fail: Expected ${action}`);
            return this._fail++;
        }
    },
    test: function() {
        this._totalSuits !== "undefined" ? this._totalSuits++ : 0;
        if (!this._description) {
            this._description = "Unnamed suite";
        }
        if (this._result.length === 0) {
            return console.log(`no tests provided for ${this._description}`);
        } else {
            console.log(`\nResults for ${this._description}:`);
            for (let test of this._result) {
                console.log(test);
            }
            console.log(`Failed tests: ${this._fail}`);
            console.log(`Successful tests: ${this._success}`);
            console.log(`-----`);
            this._result = [];
            this._fail = 0;
            this._success = 0;
            this._description = "";
        }
        return this;
    },

    result: function() {
        if (this._covered) {
            this._totalFail = this._totalFail || 0;
            this._totalSuccess = this._totalSuccess || 0;
            const total = this._totalSuccess + this._totalFail;
            console.log(
                `Total test suites: ${this._totalSuits}. Ran ${total} tests`
            );
            console.log(`Failed ${this._totalFail} tests`);
            console.log(`Passed ${this._totalSuccess} tests`);
            if (this._totalFail === 0 && this._totalSuccess) {
                console.log("100% tests were successful, you are good");
            } else if (!this._totalFail && !this._totalSuccess) {
                console.log("No tests were provided");
            } else {
                console.log(
                    `${((total - this._totalFail) / total * 100).toFixed(2)}% tests were successful`
                );
            }
        } else {
            console.log(
                "Coverage was not intiated. Run `profess.withCoverage()` before tests"
            );
        }
    },
    fast: function(value) {
        return function(assertion) {
            console.log("\nFast checking:");
            if (value === assertion) {
                console.log(`${value} equals ${assertion}`);
                console.log(`type = "${typeof value}"\n`);
                return;
            }
            if (value == assertion) {
                console.log(
                    `${value} equals ${assertion} but types are different: ${value} is not of the type ${typeof assertion} as it should be\n`
                );
                return;
            }
            console.log(`${value} is not equal ${assertion}\n`);
        };
    }
};

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
    //.want(fun)
    //.toBe.Function()
    .test();
profess.suite("Checking types").want(100).toMatchTypes("text").test();

profess.suite("another suite").want(0).toBeEqual(0).test();

profess.want(x).toBeEqual(y).test();
profess.result();

profess.fast(2)(4);
profess.fast(2)("2");
profess.fast(false)(false);
profess.fast(100)(100);
