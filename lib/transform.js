var libob = require('libobject');

/**
 * Resolve data fields in for incoming configs.
 *
 * @public
 * @param {object} The options object.
 * @param {object} The data object.
 * @param {function} The next handler.
 */
module.exports = function (options, data, next) {

    /*
        TODO create docs
        Config example
        {
            "flat.key": "{field}"
        }
    */

    // get config path value
    data = libob.change(options, data);

    // call the next handler
    next(null, data);
};
