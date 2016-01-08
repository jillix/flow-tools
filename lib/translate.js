var utils = require('./utils');

module.exports = function (options, data, next) {

    /*
        {
            "data.type": {
                ":": "adjust",
                ".": "filter_tilt_shift"
            }
        }
    */

    Object.assign(data, options, data);

    // .. do translate 

    next(null, data);
}
