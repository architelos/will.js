export default Will;
declare function Will(actual: any): Will;
declare class Will {
    constructor(actual: any);
    actual: any;
    negative: boolean;
    get will(): Will;
    get be(): Will;
    get at(): Will;
    get have(): Will;
    get a(): Will;
    get an(): Will;
    get not(): any;
    /**
     * Asserts that an object is null.
     *
     * @api public
     */
    null(): void;
    /**
     * Asserts that an object is undefined.
     *
     * @api public
     */
    undefined(): void;
    /**
     * Asserts that an object is a boolean.
     *
     * @api public
     */
    boolean(): void;
    /**
     * Asserts that an object is true.
     *
     * @api public
     */
    true(): void;
    /**
     * Asserts that an object is false.
     *
     * @api public
     */
    false(): void;
    /**
     * Asserts that an object is a number.
     *
     * @api public
     */
    number(): void;
    /**
     * Asserts that an object is a bigint.
     *
     * @api public
     */
    bigint(): void;
    /**
     * Asserts that an object is NaN.
     *
     * @api public
     */
    nan(): void;
    /**
     * Asserts that an object is a string.
     *
     * @api public
     */
    string(): void;
    /**
     * Asserts that an object is a symbol.
     *
     * @api public
     */
    symbol(): void;
    /**
     * Asserts that an object is an object.
     *
     * @api public
     */
    object(): void;
    /**
     * Asserts that an object is a function.
     *
     * @api public
     */
    function(): void;
    /**
     * Asserts that an object is an array.
     *
     * @api public
     */
    array(): void;
    /**
     * Asserts that an object is truthy.
     *
     * @api public
     */
    truthy(): void;
    /**
     * Asserts that an object is falsy.
     *
     * @api public
     */
    falsy(): void;
    /**
     * Asserts that an object is empty.
     *
     * Checks `.length` for strings and arrays,
     * and `Object.keys` for objects.
     *
     * @api public
     */
    empty(): void;
    /**
     * Asserts that an object is greater than another object.
     *
     * @param {number} expected
     * @api public
     */
    greaterThan(expected: number): void;
    /**
     * Asserts that an object is greater than or equals another object.
     *
     * @param {number} expected
     * @api public
     */
    greaterThanOrEqual(expected: number): void;
    /**
     * Asserts that an object is greater than or equals another object.
     *
     * @param {number} expected
     * @api public
     */
    greaterThanOrEqualTo: any;
    /**
     * Asserts that an object is less than another object.
     *
     * @param {number} expected
     * @api public
     */
    lessThan(expected: number): void;
    /**
     * Asserts that an object is less than or equals another object.
     *
     * @param {number} expected
     * @api public
     */
    lessThanOrEqual(expected: number): void;
    /**
     * Asserts that an object is less than or equals another object.
     *
     * @param {number} expected
     * @api public
     */
    lessThanOrEqualTo: any;
    /**
     * Asserts that an object is an instance of a class.
     *
     * @param expected
     * @api public
     */
    instanceOf(expected: any): void;
    /**
     * @api private
     */
    assert(isOk: any, message: any, expected: any): void;
}
