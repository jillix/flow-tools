"use strict"

const libob = require('libobject');

/* Arguments: {
    "flat.key": "{field}"
}*/
exports.transform = function (scope, state, args, data, stream, next) {
    libob.change(args, data, data);
    next(null, data);
};

/* Arguments: ["dd|ss|ds|sd|ed|es", {
    "flat.key": "{field}"
}]*/
exports.transform2 = function (scope, state, args, data, stream, next) {

    if (!(args instanceof Array)) {
        return next(new Error('Flow-tools.transform2: Invalid arguments.'))    
    }

    switch (args[0]) {
        case "dd":
            libob.change(args[1], data, data);
            break;
        case "ss":
            libob.change(args[1], state, state);
            break;
        case "ds":
            libob.change(args[1], data, state);
            break;
        case "sd":
            libob.change(args[1], state, data);
            break;
        case "ed":
            libob.change(args[1], scope.env, data);
            break;
        case "es":
            libob.change(args[1], scope.env, state);
            break;
        default:
            return next(new Error('Flow-tools.transform2: Invalid mode "' + args[0] + '"'));
    }

    next(null, data);
};

/* Arguments: {
    "flat.key": "{field}",
    "flat.key": ["{get.path.from.data}"i] ??
}*/
exports.env_transform = function (scope, state, args, data, stream, next) {

    let deep;
    for (let key in args) {
        if (key.indexOf('.') > 0) {
            deep = true;
        }

        if (typeof args[key] === 'string') {
            data[key] = libob.path.get(args[key], scope.env);
        } else {
            data[key] = libob.path.get(libob.path.get(args[key][1], data), libob.path.get(args[key][0], scope.env), true);
        }
    }

    if (deep) {
        data = libob.deep(data);
    }

    next(null, data);
};
