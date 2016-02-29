var libob = require('libobject');

module.exports = function (options, data, next) {

    /*  TODO create docs
        Config example
        {
            "key": {
                "value": "replace_value",
                "value": {
                    "other.flat.key": "replace_value"
                }
            }
        }
    */

    if (!libob.isObject(options._) || !libob.isObject(data)) {
        return next(new Error('Flow-Tools.translate: Config or data is not an object.')); 
    }

    // create a flat structure of the data chunk
    data = libob.flat(data);

    // replace paths from the options object
    var value;
    var translate = options._;
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
    next(null, libob.deep(data));
}
