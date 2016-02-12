
// extend data with location data (hash, search, path)
if (global.location) {
    handleStateValues(data);
}
/**
 * Extend event object with location data.
 *
 * @private
 * @param {object} The event object.
 */
function handleStateValues (data) {

    // add pathname to data object
    data._path = global.location.pathname.substr(1).split('/');

    // parse and append url search to data
    if (global.location.search && !data._search) {
        data._search = searchToJSON(global.location.search);
    }

    // append url hash to data
    if (global.location.hash && !data._hash) {
        data._hash = global.location.hash.substr(1);
    }
}

/**
 * Parse a state search string to JSON.
 * Credentials: http://snipplr.com/view/70905/search-string-to-json/
 *
 * @private
 */
function searchToJSON(search) {
    var rep = {'?':'{"','=':'":"','&':'","'};
    var s = search.replace(/[\?\=\&]/g, function(r) {
        return rep[r];
    });
    return JSON.parse(s.length? s+'"}' : "{}");
}
