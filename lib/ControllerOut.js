/**
 * @module ControllerOut
 * @description Utility object for controller responses (wraps Sails response object)
 * @see {@link https://github.com/grokible/sails-tutorial-1/blob/master/TUTORIALS/TUTORIAL02.md}
 * @see {@link http://sailsjs.org/#/documentation/reference/res|Sails Response('res') Reference}
 * @example
 * // In Sails controller:
 * let ControllerOut = require ('Local/ControllerOut')
 * ...
 * someAction: function (req, res) {
 *     let co = new ControllerOut (res)
 *     ...
 *     if (err)
 *         return co.error (err)  // jsonify err and send via Sails response obj
 *     else if (err2)
 *         return co.error (err2, { code: 'math.wayTooBig', message: "too big" });
 *                             // ^ override error properties
 * }
 */
/* jshint esnext: true */
/* jshint node: true */
"use strict";


module.exports = ControllerOut;

function ControllerOut (response) {
    this.response = response;
}

/**
 * @method 
 * @name error
 */
ControllerOut.prototype.error = function (error, options) {

    // Options properties {code, message} override error's
    // After options, underbar takes precedence (_code or _message) override error's

    options = options || {};
    let code = options.code || error._code || error.code || 'general.unknown';

    // Attempt to pull out any conceivable error message that we can use

    let message = options.message || error._message || error.message || error.description ||
        error.title || error.summary || error.reason || 'No message, unknown error.';

    let rc = {
        code: code,
        message: message
    };

    // If we are in a sails dev environment, supply all the error details
    if (global.sails.config.environment == 'development') {
        rc._internal = error;
    }

    let statusCode = this.getStatusCodeForError(error);

    return this.response.json(statusCode, { error: rc });
};

/**
 * @method
 * @name badRequest
 */
ControllerOut.prototype.badRequest = function(options) {
    
    options = options || {};

    let code = options.code || 'Bad Request';

    let message = options.message || 'Not authorized to this REST endpoint';
    
    return this.response.json(400, {code: code, message: message});

};

/**
 * @method
 * @name unauthorized
 */
ControllerOut.prototype.unauthorized = function(options) {
    
    options = options || {};

    let code = options.code || 'Unauthorized';

    let message = options.message || 'Not authendicated';
    
    return this.response.json(401, {code: code, message: message});

};

/**
 * @method
 * @name forbidden
 */
ControllerOut.prototype.forbidden = function(options) {
    
    options = options || {};

    let code = options.code || 'Forbidden';

    let message = options.message || 'Not authorized to this REST endpoint';
    
    return this.response.json(403, {code: code, message: message});

};

/**
 * @method
 * @name getStatusCodeForError
 * @param{Error} error
 */
ControllerOut.prototype.getStatusCodeForError = function(error) {
    
    if (error.code === 'ValidationError') return 400;
    
    return 500;

};

