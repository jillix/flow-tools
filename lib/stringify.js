/**
 * Stringify data or part of data
 *
 * @public
 * @param {object} The options object.
 * @param {object} The data object.
 * @param {function} The next handler.
 */
module.exports = function (options, data, next) {

	/*  TODO create docs
        Config example
        {
            "path": {
                "to": {
					"key": ""
                }
            }
        }
    */

	if (!Object.keys(options._).length) {
		try {
			data = JSON.stringify(data);
			return next(null, data);
		} catch (err) {
			return next(err);
		}
	}

	specificStringify(data, options._);
	return next(null, data);
}

/**
 * stringify based on path
 *
 * @private
 * @param {object} obj The object containing the data.
 * @param {object} path The path to the keys that will be stingified
 */
function specificStringify (obj, path) {

	for (key in path) {
		if (!path.hasOwnProperty(key)) { continue; }

		if (typeof path[key] !== 'object' && typeof obj[key] !== 'undefined') {
			try {
				obj[key] = JSON.stringify(obj[key]);
			} catch (e) {}
		}
	}
}