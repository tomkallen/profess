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
            this._log(assertion, "equals", true);
        } else {
            this._log(assertion, "equals", false);
        }
        return this;
    },

    _log: function(assertion, action, result) {
        if (result) {
            this._totalSuccess !== "undefined" ? this._totalSuccess++ : 1;
            this._result.push(`Success: ${this._value} ${action} ${assertion}`);
            return this._success++;
        } else {
            this._totalFail !== "undefined" ? this._totalFail++ : 1;
            this._result.push(
                `Fail: Expected ${assertion}, got ${this._value}`
            );
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
            console.log(`Total test suites: ${this._totalSuits}. Ran ${total} tests`);
            console.log(`Failed ${this._totalFail} tests`);
            console.log(`Passed ${this._totalSuccess} tests`);
            if (this._totalFail === 0 && this._totalSuccess) {
                console.log("100% tests were successful, you are good");
            } else if (!this._totalFail && !this._totalSuccess) {
                console.log("No tests were provided");
            } else {
                console.log(
                    `${((total - this._totalFail) / total * 100).toFixed(2)}% test were successful`
                );
            }
        } else {
            console.log(
                "Coverage was not intiated. Run `profess.withCoverage()` before tests"
            );
        }
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
    .suite("add more odd testing")
    .want(true)
    .toBeEqual(false)
    .test();

profess.suite("another suite").want(0).toBeEqual(0).test();

profess.want(x).toBeEqual(y).test();
profess.result();
