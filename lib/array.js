'use strict';

const libob = require('libobject');

exports.length = (path, data, callback) => {

    let array = libob.path.get(path, data);

    if (typeof array !== 'object' || !(array instanceof Array)) {
        return callback(new Error('Flow-tools.array.length: Data is not an array.'));
    }

    callback(null, array.length);
};