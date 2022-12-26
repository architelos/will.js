import Will from "./src/will.js";

Object.defineProperty(Object.prototype, "will", {
    get: function () {
        return new Will(this);
    },

    set: function (value) {
        Object.defineProperty(this, "will", {
            value: value,
            configurable: true,
            enumrable: true,
            writable: true
        });
    },

    configurable: true
});