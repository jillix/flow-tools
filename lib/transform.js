var libob = require('libobject');

/**
 * Resolve data fields in for incoming configs.
 *
 * @public
 * @param {object} The options object.
 * @param {object} The data object.
 * @param {function} The next handler.
 */
exports.transform = function (scope, inst, args, data, next) {

    /*
        TODO create docs
        Config example
        {
            "flat.key": "{field}"
        }
    */

    // get config path value
    data = libob.change(args, data);
    next(null, data);
};

exports.env_transform = function (scope, inst, args, data, next) {

    let deep;
    for (let key in args) {
        if (key.indexOf('.') > 0) {
            deep = true;
        }

        if (typeof args[key] === 'string') {
            data[key] = libob.path(args[key], scope.env);
        } else {
            data[key] = libob.path(libob.path(args[key][1], data), libob.path(args[key][0], scope.env), true);
        }
    }

    if (deep) {
        data = libob.deep(data);
    }

    next(null, data);
};
