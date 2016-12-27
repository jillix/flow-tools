"use strict"

module.exports = function (scope, state, args, data, next) {
    let emit = data.emit || args.emit;
    if (!emit) {
        return next(new Error('Flow-tools.emit: Event not found.'));
    }

    data.emit = scope.flow(emit).write(data);
    next(null, data);
};
