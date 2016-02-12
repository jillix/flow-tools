// get an attribute value from a dom element or the element itself
function getPathValue (path, module_instance, data) {

    if (path[0] === '$') {
        path = path.substr(1).split(':');

        // get find an element in the document
        path[0] = document.querySelector(path[0]);

        // set data key to the dom attribute value or the dom element
        return path[1] && path[0][path[1]] !== undefined ? path[0][path[1]] : path[0];
    }
}
