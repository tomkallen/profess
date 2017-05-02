const profess = {
    withCoverage: function() {
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
    toBeDeepEqual: function(assertion) {
        if (
            this._value.length !== assertion.length ||
            typeof this._value !== typeof assertion
        ) {
            this._log(
                null,
                "values to be deep equal but they are of different type",
                false
            );
            return this;
        }
        let equal = true;
        const flatten = arr =>
            arr.reduce(
                (f, i) => f.concat(Array.isArray(i) ? flatten(i) : i),
                []
            );

        if (Array.isArray(this._value)) {
            const A = flatten(this._value);
            const B = flatten(assertion);

            A.forEach((e, i) => {
                if (A[i] !== B[i]) equal = false;
            });
            if (equal) {
                this._log(null, `arrays are deep equal`, true);
            } else {
                this._log(
                    null,
                    `arrays to be deep equal but they are not`,
                    false
                );
            }
            return this;
        }
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
            this._compareTypes("function");
            return this;
        },
        Number: function() {
            this._compareTypes("number");
            return this;
        },
        String: function() {
            this._compareTypes("string");
            return this;
        },
        Boolean: function() {
            this._compareTypes("boolean");
            return this;
        },
        Null: function() {
            this._compareTypes("null");
            return this;
        },
        Undefined: function() {
            this._compareTypes("undefined");
            return this;
        }
    },

    _compareTypes(T) {
        if (typeof this._value === T) {
            this._log(null, `the type is "${T}"`, true);
        } else {
            this._log(
                null,
                `type to be ${T}, got ${typeof this._value} instead`,
                false
            );
        }
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

    absolute: function(assertion) {
        if (Object.is(this._value, assertion)) {
            this._log(
                null,
                `${this._value} and ${assertion} are the same`,
                true
            );
        } else {
            this._log(
                null,
                `${this._value} and ${assertion} to have the same value`,
                false
            );
        }
        return this;
    },

    test: function() {
        this._totalSuits !== "undefined" ? this._totalSuits++ : 0;
        if (!this._description) {
            this._description = "Unnamed suite";
        }
        if (this._result.length === 0) {
            return console.log(`no tests provided for ${this._description}`);
        } else {
            console.log(`\n%cResults for ${this._description}:`, 'color: orange');
            for (let test of this._result) {
                console.log(test);
            }
            console.log(`%cFailed tests: ${this._fail}`, 'color:red');
            console.log(`%cSuccessful tests: ${this._success}`, 'color:green');
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

for (let type of Object.keys(profess.toBe)) {
    profess.toBe[type] = profess.toBe[type].bind(profess);
}
