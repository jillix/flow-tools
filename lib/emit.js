"use strict"

// TODO create a suite to route flow sequences

module.exports = function (scope, state, args = {}, data, stream, next) {

    /*{
        seqId: data.seqId (string)
        package: data.data (object)
        stream: data.stream (bool)
    }*/

    // call flow sequnce
    let options;
    if (typeof stream.pipe === "function") {
        options = {objectMode: args.objectMode || stream._readableState.objectMode};
    }

    const flow = scope.flow(args.seq || data.seq, args.data || data, options, next);
    flow.on('error', next);
    stream.done = next;
    if (flow.pipe) {
        stream = stream.pipe(flow);
    }
};
