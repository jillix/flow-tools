module.exports = (data, stream, callback) => {

    // data must be an array
    if (!(data instanceof Array)) {
        return callback(new Error('Flow-tool.slice: Data chunk must be an array.'));
    }

    if (!data.length) {
        return callback(new Error('Flow-tool.slice: Data chunk must be a non empty array'));
    }

    let lastItem = data.pop();
    data.forEach(item => {
        stream.push(item);
    });
    callback(null, lastItem);
};
