var libob = require('libobject');
var qs = require('qs');

/**
 * Parse data or part of data
 *
 * @public
 * @param {object} The options object.
 * @param {object} The data object.
 * @param {function} The next handler.
 */
exports.parse = function (options, data, next) {
    var error;
    onKey(options, data, function (key, value, options) {
        if (!error) {
            try {

                if (typeof value !== 'string') {
                    if (typeof value.toString !== 'function') {
                        throw new Error('Flow-tools.json.parse: Value can not be converted to a string.');
                    }

                    value = value.toString();
                }

                if (value.length > 0) {
                    value = (options && options.inputType && options.inputType === 'urlencoded') ? qs.parse(value) : JSON.parse(value);
                } else {
                    value = {};
                }

                if (key === null) {
                    data = value;
                } else {
                    data[key] = value;
                }
            } catch (err) {
                error = err;
            }
        }
    });

    next(error, data);
}

/**
 * Stringify data or part of data
 *
 * @public
 * @param {object} The options object.
 * @param {object} The data object.
 * @param {function} The next handler.
 */
exports.stringify = function (options, data, next) {

    var error;
    onKey(options, data, function (key, value, options) {
        if (!error) {
            options = options || {};
            try {
                value = JSON.stringify(value, null, options.space);
                if (key === null) {
                    data = value; 
                } else {
                    data[key] = value;
                }
            } catch (err) {
                error = err;
            }
        }
    });
    
    next(error, data);
}

/**
 * stringify based on path
 *
 * @private
 * @param {array} keys An array containing the object keys.
 * @param {object} object The object containing the data.
 * @param {object} handler The value handler function.
 */
function onKey (keys, object, handler) {
    if (keys && (!(keys instanceof Array) || keys.length === 0)) {
        return handler(null, object);
    }

    keys.forEach(function (key) {
        var options = null;
        if (key instanceof Array) {
            options = key[1];
            key = key[0];
        }
        if (!object.hasOwnProperty(key)) {
            return;
        }

        handler(key, libob.path(key, object), options);
    });
}
