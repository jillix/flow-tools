"use strict"

const libob = require('libobject');

/* Arguments: ["dd|ss|ds|sd|ed|es", {
    "flat.key": "{field}"
}]*/
exports.transform = (config, source, target) => {

    libob.change(config, source, target);
};

// /* Arguments: {
//     "flat.key": "{field}",
//     "flat.key": ["{get.path.from.data}"i] ??
// }*/
// exports.env_transform = function (scope, state, args, data, stream, next) {

//     let deep;
//     for (let key in args) {
//         if (key.indexOf('.') > 0) {
//             deep = true;
//         }

//         if (typeof args[key] === 'string') {
//             data[key] = libob.path.get(args[key], scope.env);
//         } else {
//             data[key] = libob.path.get(libob.path.get(args[key][1], data), libob.path.get(args[key][0], scope.env), true);
//         }
//     }

//     if (deep) {
//         data = libob.deep(data);
//     }

//     next(null, data);
// };
