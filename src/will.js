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