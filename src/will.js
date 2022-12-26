import { AssertionError } from "node:assert";
import { inspect } from "node:util";

function Will(actual) {
    if (!(this instanceof Will)) {
        return new Will(actual);
    }

    this.actual = actual;
    this.negative = false;
}

/**
 * Pass-through properties for a chain:
 * 
 * - will
 * - be
 * - at
 * - have
 * - a
 * - an
 * - that
 * - not (inverts the assertion)
 * 
 * @api public
 */
["will", "be", "at", "have", "a", "an", "that"].forEach((chain) => {
    Object.defineProperty(Will.prototype, chain, {
        get: function () {
            return this;
        }
    });
});

/**
 * Inverts the assertion.
 * 
 * @api public
 */
Object.defineProperty(Will.prototype, "not", {
    get: function () {
        const clone = Object.create(this);

        clone.negative = !this.negative;

        return clone;
    }
});

/**
 * Asserts that an object is null.
 * 
 * @api public
 */
Will.prototype.null = function () {
    this.assert(this.actual === null, "null", null);
};

/**
 * Asserts that an object is undefined.
 * 
 * @api public
 */
Will.prototype.undefined = function () {
    this.assert(this.actual === undefined, "undefined", "undefined");
};

/**
 * Asserts that an object is a boolean.
 * 
 * @api public
 */
Will.prototype.boolean = function () {
    this.assert(typeof this.actual === "a boolean");
};

/**
 * Asserts that an object is true.
 * 
 * @api public
 */
Will.prototype.true = function () {
    this.assert(this.actual === true, "true", true);
};

/**
 * Asserts that an object is false.
 * 
 * @api public
 */
Will.prototype.false = function () {
    this.assert(this.actual === false, "false", false);
};

/**
 * Asserts that an object is a number.
 * 
 * @api public
 */
Will.prototype.number = function () {
    this.assert(typeof this.actual === "number", "a number");
};

/**
 * Asserts that an object is a bigint.
 * 
 * @api public
 */
Will.prototype.bigint = function () {
    this.assert(typeof this.actual === "bigint", "a bigint");
};

/**
 * Asserts that an object is NaN.
 * 
 * @api public
 */
Will.prototype.nan = function () {
    this.assert(isNan(this.actual), "NaN");
};

/**
 * Asserts that an object is a string.
 * 
 * @api public
 */
Will.prototype.string = function () {
    this.assert(typeof this.actual === "string", "a string");
};

/**
 * Asserts that an object is a symbol.
 * 
 * @api public
 */
Will.prototype.symbol = function () {
    this.assert(typeof this.actual === "symbol", "a symbol");
};

/**
 * Asserts that an object is an object.
 * 
 * @api public
 */
Will.prototype.object = function () {
    let isObject = false;

    if (typeof this.actual === "object"
        && !Array.isArray(this.actual)
        && this.actual !== null
        && typeof this.actual !== "function") {
        isObject = true;
    }

    this.assert(isObject, "an object");
};

/**
 * Asserts that an object is a function.
 * 
 * @api public
 */
Will.prototype.function = function () {
    this.assert(typeof this.actual === "function", "a function");
};

/**
 * Asserts that an object is an array.
 * 
 * @api public
 */
Will.prototype.array = function () {
    this.assert(Array.isArray(this.actual), "an array");
};

/**
 * Asserts that an object is truthy.
 * 
 * @api public
 */
Will.prototype.truthy = function () {
    this.assert(!!this.actual, "truthy");
};

/**
 * Asserts that an object is falsy.
 * 
 * @api public
 */
Will.prototype.falsy = function () {
    this.assert(!!this.actual, "falsy");
};

/**
 * Asserts that an object is empty.
 * 
 * Checks `.length` for strings and arrays,
 * and `Object.keys` for objects.
 * 
 * @api public
 */
Will.prototype.empty = function () {
    let isEmpty = false;

    if (!this.actual) {
        isEmpty = true;
    } else if (typeof this.actual === "string" || Array.isArray(this.actual)) {
        isEmpty = !this.actual.length;
    } else if (typeof this.actual === "object") {
        isEmpty = !Object.keys(this.actual)[0];
    }

    this.assert(isEmpty, "empty");
};

/**
 * Asserts that an object is greater than another object.
 *  
 * @param {number} expected
 * @api public
 */
Will.prototype.greaterThan = function (expected) {
    this.assert(this.actual > expected, `greater than ${expected}`);
};

/**
 * Asserts that an object is greater than or equals another object.
 * 
 * @param {number} expected
 * @api public
 */
Will.prototype.greaterThanOrEqual = function (expected) {
    this.assert(this.actual >= expected, `greater than or equal to ${expected}`);
};

/**
 * Asserts that an object is greater than or equals another object.
 * 
 * @param {number} expected
 * @api public
 */
Will.prototype.greaterThanOrEqualTo = Will.prototype.greaterThanOrEqual;

/**
 * Asserts that an object is less than another object.
 * 
 * @param {number} expected
 * @api public 
 */
Will.prototype.lessThan = function (expected) {
    this.assert(this.actual < expected, `less than ${expected}`);
};

/**
 * Asserts that an object is less than or equals another object.
 * 
 * @param {number} expected
 * @api public
 */
Will.prototype.lessThanOrEqual = function (expected) {
    this.assert(this.actual <= expected, `less than or equal to ${expected}`);
};

/**
 * Asserts that an object is less than or equals another object.
 * 
 * @param {number} expected
 * @api public
 */
Will.prototype.lessThanOrEqualTo = Will.prototype.lessThanOrEqual;

/**
 * Asserts that an object is an instance of a class.
 * 
 * @param aClass
 * @api public 
 */
Will.prototype.instanceOf = function (expected) {
    this.assert(this.actual instanceof expected, `an instance of ${expected.displayName || expected.name || inspect(expected)}`);
};

/**
 * @api private
 */
Will.prototype.assert = function (isOk, message, expected) {
    const actual = inspect(this.actual);

    if (this.negative !== isOk) {
        return;
    }

    const assertionOptions = {
        actual: actual
    };

    if (expected) {
        assertionOptions.expected = expected;
    }

    assertionOptions.message = `${actual} is ${this.negative ? "" : "not "}${message}`;

    throw new AssertionError(assertionOptions);
};

export default Will;