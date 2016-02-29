var tap = require('tap');
var handler = require('../index').transform;
var test = {
    options: {
        _: {
            field: "{other.field}",
        }
    },
    chunk: {
        other: {field: "value"}
    },
    result: {
        field: "value"
    }
};

tap.test('Transform handler', function (_tap) {
    handler(test.options, test.chunk, function (err, data) {

        if (err) {
            throw err;
        }

        _tap.match(data, test.result);
        _tap.end()
    });
});
