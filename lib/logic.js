var libob = require('libobject');
var jsonLogic = require('json-logic-js');

module.exports = function (options, data, next) {

    if (!libob.isObject(options._) || !libob.isObject(data)) {
        return next(new Error('Flow-tools.logic: Options or data is not an object.'));
    }

    // do logic for multiple keys
    Object.keys(options._).forEach(function (key) {
        data[key] = jsonLogic.apply(options._[key], data);
    });

    next(null, data);
};
