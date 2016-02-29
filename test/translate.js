var tap = require('tap');
var handler = require('../index').translate;
var test = {
    options: {
        _: {
            "key": {
                "value": "replaced_value",
                "1": {
                    "new_key": "new_value"
                }
            },
            "nested.key": {
                "value": "replaced_nested_value",
                "0": {
                    "new.nested.key": "new_nested_value"
                }
            }
        }
    },
    chunks: [
        {
            key: "value",
            nested: {
                key: "value"
            } 
        },
        {
            key: 1,
            nested: {
                key: 0
            } 
        }
    ],
    results: [
        {
            key: "replaced_value",
            nested: {
                key: "replaced_nested_value"
            }
        },
        {
            new_key: "new_value",
            "new": {
                nested: {
                    key: "new_nested_value"
                }
            }
        }
    ]
};

tap.test('Translate replace', function (_tap) {
    handler(test.options, test.chunks[0], function (err, data) {

        if (err) {
            throw err;
        }

        _tap.match(data, test.results[0]);
        _tap.end()
    });
});

tap.test('Translate extend', function (_tap) {
    handler(test.options, test.chunks[1], function (err, data) {

        if (err) {
            throw err;
        }

        _tap.match(data, test.results[1]);
        _tap.end()
    });
});
