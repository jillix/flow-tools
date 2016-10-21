'use strict'

module.exports = function (args, data, next) {
    let emit = data.emit || args.emit;
    if (!emit) {
        return next(new Error('Flow-tools.emit: Event not found.'));
    }

    data.emit = this.flow(emit);
    next(null, data);
};
