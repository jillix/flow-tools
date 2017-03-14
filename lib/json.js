'use strict';

const libob = require('libobject');
const qs = require('qs');

/**
 * Parse data or part of data
 *
 * @public
 * @param {object} The options object.
 * @param {object} The data object.
 * @param {function} The callback.
 */
exports.parse = (options, data, callback) => {
    let error;
    onKey(options, data, (key, value, options) => {
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
                    // TODO this is a hack!
                    // there should be a separate key in the args config,
                    // to attach the stringified value.
                    if (key.indexOf('.') > 0) {
                        key = key.split('.')[0];
                    }

                    data[key] = value;
                }
            } catch (err) {
                error = err;
            }
        }
    });

    callback(error, data);
};

/**
 * Stringify data or part of data
 *
 * @public
 * @param {object} The options object.
 * @param {object} The data object.
 * @param {function} The callback.
 */
exports.stringify = (options, data, callback) => {

    let error;
    onKey(options, data, (key, value, options) => {
        if (!error) {
            options = options || {};
            try {
                value = JSON.stringify(value, null, options.space);
                if (key === null) {
                    data = value;
                } else {

                    // TODO this is a hack!
                    // there should be a separate key in the args config,
                    // to attach the stringified value.
                    if (key.indexOf('.') > 0) {
                        key = key.split('.')[0];
                    }

                    data[key] = value;
                }
            } catch (err) {
                error = err;
            }
        }
    });

    callback(error, data);
};

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

    keys.forEach(key => {
        let options = null;
        if (key instanceof Array) {
            options = key[1];
            key = key[0];
        }

        handler(key, libob.path.get(key, object), options);
    });
}