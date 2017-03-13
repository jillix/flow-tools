'use strict';

const libob = require('libobject');

module.exports = (config, data) => {

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

    if (typeof config !== 'object' || typeof data !== 'object') {
        return new Error('Flow-Tools.translate: Config or data is not an object.');
    }

    // replace paths from the config object
    let value;
    let translate = config;
    for (let path in translate) {

        if (typeof (value = libob.path.get(path, data)) === 'undefined') {
            continue;
        }

        if (typeof translate[path][value] !== 'undefined') {
            if (typeof translate[path][value] === 'object') {
                for (let flat in translate[path][value]) {
                    data[flat] = translate[path][value][flat];
                }
            } else {
                data[path] = translate[path][value];
            }
        }
    }

    // unflat data chunk
    return libob.deep(data);
};
