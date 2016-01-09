var utils = require('./utils');
var jsonLogic = require('json-logic').jsonLogic;

module.exports = function (options, data, next) {

    /*
    var rules = {"and": [
        {"<" : [{"var": "temp"}, 110]},
        {"==": [{"var": "pie.filling"}, "apple"]}
    ]};

    var data = { "temp" : 100, "pie" : { "filling" : "apple" } };

    console.log(jsonLogic(rules, data));
    */

    // merge options into data
    //Object.assign(data, options, data);

    // .. do masking

    next(null, data);
}
