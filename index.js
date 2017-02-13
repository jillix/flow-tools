'use strict'

var libob = require('libobject');
var transform = require('./lib/transform');
var translate = require('./lib/translate');
var logic = require('./lib/logic');
var mask = require('./lib/mask');
var json = require('./lib/json');
var slice = require('./lib/slice');
var emit = require('./lib/emit');
//var join = require('./lib/join');

exports.deep = function (scope, inst, args, data, stream, next) {

    data = libob.deep(data);

    if (data instanceof Error) {
        return next(data);
    }

    next(null, data);
};

exports.flat = function (scope, inst, args, data, stream, next) {

    data = libob.flat(data);

    if (data instanceof Error) {
        return next(data);
    }

    next(null, data);
};

exports.emit = emit;
exports.parse = json.parse;
exports.stringify = json.stringify;
exports.transform = transform.transform;
exports.transform2 = transform.transform2;
exports.env_transform = transform.env_transform;
exports.state_transform = transform.state_transform;
exports.translate = translate;
exports.logic = logic;
exports.mask = mask;
exports.slice = slice;
//exports.join = join;
