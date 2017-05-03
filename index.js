'use strict';

const libob = require('libobject');
const transform = require('./lib/transform');
const translate = require('./lib/translate');
const logic = require('./lib/logic');
const mask = require('./lib/mask');
const json = require('./lib/json');
const slice = require('./lib/slice');
const array = require('./lib/array');
//const join = require('./lib/join');

exports.deep = (data) => {
    return libob.deep(data);
};

exports.flat = (data) => {
    return libob.flat(data);
};

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
exports.array = array;
//exports.join = join;
