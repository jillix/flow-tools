module.exports = function (scope, inst, options, data, next, stream) {

    // data must be an array
    if (!(data instanceof Array)) {
        return next(new Error('Flow-tool.slice: Data chunk must be an array.'));
    }

    if (!data.length) {
        return next(new Error('Flow-tool.slice: Data chunk must be a non empty array'));
    }

    var lastItem = data.pop();
    data.forEach(function (item) {
        stream.push(item);
    });
    next(null, lastItem);
};
