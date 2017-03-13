"use strict"

// TODO create a suite to route flow sequences

module.exports = function (event, state, args, next) {

    // call flow sequnce
    let options;
    if (typeof event.output.pipe === "function") {
        options = {objectMode: args.objectMode};// || stream._i._readableState.objectMode};
    }

    data.seq = args.seq || data.seq;
    next(null, data, event.output.pipe(scope.flow(data.seq, args.data || data, options)));
};
