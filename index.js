var libob = require('libobject');
var transform = require('./lib/transform');
var translate = require('./lib/translate');
var logic = require('./lib/logic');
var mask = require('./lib/mask');
var stringify = require('./lib/stringify');
//var slice = require('./lib/slicer');
//var join = require('./lib/join');

exports.deep = function (options, data, next) {

    data = libob.deep(data);

    if (data instanceof Error) {
        return next(data);
    }

    next(null, data);
};

exports.flat = function (options, data, next) {

    data = libob.flat(data);

    if (data instanceof Error) {
        return next(data);
    }

    next(null, data);
};

exports.parse = function (options, data, next) {

    if (!data.data) {
        return next(null, data);
    }

    // try and parse buffer
    try {
        data.data = JSON.parse(data.data.toString());
    } catch (error) {
        return next(error);
    }

    return next(null, data);
}

exports.stringify = stringify;
exports.transform = transform;
exports.translate = translate;
exports.logic = logic;
exports.mask = mask;
//exports.slice = slice;
//exports.join = join;
