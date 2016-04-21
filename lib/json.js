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

                if (typeof value !== 'string') {
                    if (typeof value.toString !== 'function') {
                        throw new Error('Flow-tools.json.parse: Value can not be converted to a string.');
                    }

                    value = value.toString();
                }

                value = value.length > 0 ? JSON.parse(value) : value;

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
    onKey(options._, data, function (key, value) {
        if (!error) {
            try {
                value = JSON.stringify(value);
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
 * @param {array} keys An arrau containing the object keys.
 * @param {object} object The object containing the data.
 * @param {object} handler The value handler function.
 */
function onKey (keys, object, handler) {
    if (keys && (!(keys instanceof Array) || keys.length === 0)) {
        return handler(null, object);
    }

    keys.forEach(function (key) {
		if (!object.hasOwnProperty(key)) {
            return;
        }

        handler(key, libob.path(key, object));
    });
}
