/**
 * @module
 * @name Errors
 * @description module containing all the errors specified by XTENS
 */
/* jshint esnext: true */
/* jshint node: true */
"use strict";

/**
 * @class
 * @name InvalidFormatError
 * @description Invalid Format error
 */
class InvalidFormatError extends Error {

    constructor(message) {
        super();
        this.code = "InvalidFormatError";
        this.message = (message || "");
    }

}

/**
 * @class
 * @name TransactionError
 * @description Transaction error
 */
class TransactionError extends Error {

    constructor(message) {
        super();
        this.code = "TransactionError";
        this.message = (message || "");
    }

}

/**
 * @class
 * @name ValidationError
 * @description Validation error
 */
class ValidationError extends Error {

    constructor(message) {
        super();
        this.code = "ValidationError";
        this.message = message || "";
    }

}

module.exports.InvalidFormatError = InvalidFormatError;
module.exports.TransactionError = TransactionError;
module.exports.ValidationError = ValidationError;
