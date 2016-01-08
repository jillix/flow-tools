var utils = require('./utils');

module.exports = function (options, data, next) {

    var mask = options.mask || this._config.maks;
    if (!mask) {
        return next(new Error('Flow-Tools: Mask: No mask found.'));
    }

    // .. do masking

    next(null, data);
}
