var libob = require('libobject');

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
    onKey(options._, data, function (key, value) {
        if (!error) {
            try {
                data[key] = JSON.parse(value);
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
    onKey(options._, data, function (key, value) {
        if (!error) {
            try {
                data[key] = JSON.stringify(value);
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
 * @param {array} keys An arrau containing the object keys.
 * @param {object} object The object containing the data.
 * @param {object} handler The value handler function.
 */
function onKey (keys, object, handler) {
    if (keys && (!(keys instanceof Array) || keys.length === 0)) {
        return handler(null, data);
    }

    keys.forEach(function (key) {
		if (!object.hasOwnProperty(key)) {
            return;
        }

        handler(key, libob.path(key, object));
    });
}
