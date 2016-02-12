var utils = require('./utils');

// regular expression patterns
var find_tmpl = /\{([\w\.]+)\}/g;
var find_braces = /\{|\}/g;

/**
 * Resolve data fields in for incoming configs.
 *
 * @public
 * @param {object} The options object.
 * @param {object} The data object.
 * @param {function} The next handler.
 */
module.exports = function (options, data, next) {

    if (typeof data !== 'object') {
        data = {data: data};
    }

    // ensure data object
    if (options && (options.data || options.set)) {
        data = data || {};
    }

    var key;

    // "data": {"key": "{value}"}
    if (options.data) {
        for (key in options.data) {

            // parse the data field values
            data[key] = parsePath(options.data[key], this, data);
        }
    }

    // search for path in data and module instance and set it to the cloned config
    // "set": {"key": "{path}", "key": "${#css:attr}"}
    if (options.set) {
        for (key in options.set) {
            data[key] = parsePath(options.set[key], this, data, true);
        }
    }

    // create nest objects with flat keys
    if (options.data || options.set) {
        data = utils.deep(data);
    }

    // call the next handler
    next(null, data);
};

/**
 * Replace data fields in a string.
 *
 * @private
 * @param {string} The string.
 * @param {object} The data context.
 */
function parsePath (path, module_instance, data, getValue) {

    if (typeof path !== 'string') {
        return path;
    }

    if (path.indexOf('{') < 0) {
        return getValue ? getPathValue(path, data, module_instance) : path;
    }

    var match = path.match(find_tmpl);

    // replace route with data
    if (match) {
        for (var i = 0, value; i < match.length; ++i) {

            // get value from object
            value = utils.path(match[i].replace(find_braces, ''), [data, module_instance]);

            // replace value in route
            if (typeof value !== 'undefined') {
                path = typeof value === 'object' ? value : path.replace(match[i], value);
            }
        }
    }

    // get path value or return path
    return getValue ? getPathValue(path, data, module_instance) : path;
}

/**
 * Merge dynamic data to the event data object.
 *
 * @private
 * @param {object} The module instance.
 * @param {object} The event config.
 * @param {object} The event data object.
 */
function getPathValue (path, module_instance, data) {

    if (!data) {
        return utils.path(path, [module_instance, global]);
    }

    // return search value with a path: 1. data, 3. instance, 4. global
    return utils.path(path, [data, module_instance, global]);
}
