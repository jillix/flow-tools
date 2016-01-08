var utils = require('./utils');

module.exports = function (options, data, next) {

    /*  TODO create docs
        Config example
        {
            "data_key": {
                "value": "replace_value",
                "value": {
                    "other_keys": "replace_value"
                }
            }
        }
    */

    if (!options.translate) {
        return next(new Error('Flow-Tools: Translate: No config in options.'));
    }

    // create a flat structure of the data chunk
    data = utils.flat(data);

    // replace paths from the options object
    var value;
    var translate = options.translate;
    for (var path in translate) { 

        if (typeof (value = data[path]) === 'undefined') {
            continue;
        }

        if (typeof translate[path][value] !== 'undefined') {
            if (typeof translate[path][value] === 'object') {
                for (var flat in translate[path][value]) {
                    data[flat] = translate[path][value][flat];
                }
            } else {
                data[path] = translate[path][value];
            }
        }
    }

    // unflat data chunk 
    data = utils.deep(data);

    next(null, data);
}
