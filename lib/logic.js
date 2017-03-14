'use strict';

const libob = require('libobject');
const jsonLogic = require('json-logic-js');

module.exports = (options, data, callback) => {

    if (!libob.isObject(options) || !libob.isObject(data)) {
        return callback(new Error('Flow-tools.logic: Options or data is not an object.'));
    }

    // do logic for multiple keys
    Object.keys(options).forEach(function (key) {
        data[key] = jsonLogic.apply(options[key], data);
    });

    callback(null, data);
};