/**
 * Get a value from a property "path" (dot.notation).
 * path('Object.key.key.value'[, {'key': {'key': {'value': 123}}}]);
 *
 * @public
 * @param {string} The path in "dot" notation.
 * @param {array} The data objects, which are used to search the path.
 */
exports.path = function getPathValue (path, scopes, count) {

    if (!path) {
        return;
    }

    // get scope
    count = count || 0;
    var scope = scopes[count];

    // if no scope is found
    if (!scope) {
        return;
    }

    // prepare path
    var o = path;
    path = path.split('.');

    // find keys in paths or return
    for (var i = 0; i < path.length; ++i) {
        if ((scope = scope[path[i]]) === undefined) {
            return scopes[++count] ? getPathValue(o, scopes, count) : undefined;
        }
    }

    return scope;
};

/**
 * Create a flat object {key1: {key2: "value"}} => {"key1.key2": "value"}
 *
 * @public
 * @param {string} The object, which is flattened.
 */
exports.flat = function (object) {
    var output = {};
    var value;
    var newKey;

    // recusrive handler
    function step(obj, prev) {
        for (var key in obj) {
            value = obj[key];
            newKey = prev + key;

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {

                if (Object.keys(value).length) {
                    step(value, newKey + '.');
                    continue;
                }
            }

            output[newKey] = value;
        }
    }

    // start recursive loop
    step(object, '');

    return output;
};

/**
 * Unflatten dot-notation keys {"key1.key2": "value"} => {key1: {key2: "value"}}
 *
 * @public
 * @param {string} The object, which is unflattened.
 */
exports.deep = function (object) {
    var result = {};
    var parentObj = result;
    var key;
    var subkeys;
    var subkey;
    var last;
    var keys = Object.keys(object);

    for (var i = 0; i < keys.length; ++i) {

        key = keys[i];
        subkeys = key.split('.');
        last = subkeys.pop();

        for (var ii = 0; ii < subkeys.length; ++ii) {
            subkey = subkeys[ii];
            parentObj[subkey] = parentObj[subkey] === undefined ? ((subkeys[ii + 1] || last) === "0" ? [] : {}) : parentObj[subkey];
            parentObj = parentObj[subkey];
        }

        parentObj[last] = object[key];
        parentObj = result;
    }

    return result;
};
