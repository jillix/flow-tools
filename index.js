var libob = require('libobject');
var transform = require('./lib/transform');
var translate = require('./lib/translate');
//var mask = require('./lib/mask');
//var slice = require('./lib/slicer');
//var join = require('./lib/join');
//var logic = require('./lib/logic');

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

exports.transform = transform;
exports.translate = translate;
//exports.mask = mask;
//exports.slice = slice;
//exports.join = join;
//exports.logic = logic;
