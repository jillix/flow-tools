'use strict';

const libob = require('libobject');
const jsonLogic = require('json-logic-js');

module.exports = (rules, data, callback) => {

    if (!libob.isObject(rules) || !libob.isObject(data)) {
        return callback(new Error('Flow-tools.logic: Options or data is not an object.'));
    }

    let result = jsonLogic.apply(rules, data);

    callback(null, result);
};