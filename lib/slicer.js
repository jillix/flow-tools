var utils = require('./utils');

module.exports = function (options, data, next) {

    var slice  = options.slice || this._config.slice;
    if (!slice) {
        return next(new Error('Flow-Tools: Slice: No key defined to slice.'));
    }

    // .. do slicing 

    next(null, data);
}
