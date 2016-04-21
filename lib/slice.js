module.exports = function (options, data, next) {

    // data must be an array
    if (!(data instanceof Array)) {
        return next(new Error('Flow-tool.slice: Data chunk must be an array.'));
    }

    var lastItem = data.pop();
    data.forEach(function (item) {
        next(item, true);
    });
    next(null, lastItem);
}
