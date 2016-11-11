var libob = require('libobject');

/**
 * Add a mask on top of the data chunk.
 *
 * @public
 * @param {object} The options object.
 * @param {object} The data object.
 * @param {function} The next handler.
 */
module.exports = function (scope, inst, options, data, next) {

    /*  TODO create docs
        Config example
        {
            "key": "",
            "key": {
                "key": ""
            }
        }
    */

    if (!libob.isObject(options) || typeof data !== 'object') {
        return next(new Error('Flow-Tools.mask: Config or data is not an object.')); 
    }

    next(null, build(data, options));
}

/**
 * Build new object using mask
 *
 * @private
 * @param {object} obj The object containing the data.
 * @param {object} mask The mask used to build the new object.
 */
function build (obj, mask) {
    var newObj = {};

    for (var key in mask) {
        if (!mask.hasOwnProperty(key)) continue;

        if (libob.isObject(mask[key]) && obj[key]) {
            newObj[key] = build(obj[key], mask[key]);
        } else if (!libob.isObject(mask[key]) && obj[key]) {
            newObj[key] = obj[key];
        }
    }

    return newObj;
}
