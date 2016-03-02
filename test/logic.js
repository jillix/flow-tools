var tap = require('tap');
var handler = require('../index').logic;
var test = {
    options: {
        _: {
            "key": {
                "and": [
                    {"<" : [{"var": "temp"}, 110]},
                    {"==" : [{"var" : "pie.filling"}, "apple"]}
                ]
            }
        }
    },
    chunk: {
        "temp": 100,
        "pie": {
            "filling": "apple"
        }
    },
    result: {
        key: true
    }
};

tap.test('Logic handler', function (_tap) {
    handler(test.options, test.chunk, function (err, data) {

        if (err) {
            throw err;
        }

        _tap.match(data, test.result);
        _tap.end();
    });
});
