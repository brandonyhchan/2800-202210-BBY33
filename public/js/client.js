function ajaxPOST(url, callback, data) {

    /*
     * - Keys method of the object class returns an array of all of the keys for an object
     * - The map method of the array type returns a new array with the values of the old array
     *   and allows a callback function to perform an action on each key
     *   The join method of the arra type accepts an array and creates a string based on the values
     *   of the array, using '&' we are specifying the delimiter
     * - The encodeURIComponent function escapes a string so that non-valid characters are replaced
     *   for a URL (e.g., space character, ampersand, less than symbol, etc.)
     *
     *
     * References:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
     */
    let params = typeof data == 'string' ? data : Object.keys(data).map(
        function(k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');
    console.log("params in ajaxPOST", params);

    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //console.log('responseText:' + xhr.responseText);
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("POST", url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

// POST TO THE SERVER
document.querySelector("#submit").addEventListener("click", function(e) {
    e.preventDefault();
    let user_name = document.getElementById("user_name");
    let password = document.getElementById("password");
    let queryString = "user_name=" + user_name.value + "&password=" + password.value;
    //console.log("data that we will send", email.value, password.value);
    const vars = { "user_name": user_name, "password": password }
    ajaxPOST("/login", function(data) {

        if (data) {
            let dataParsed = JSON.parse(data);
            console.log(dataParsed);
            if (dataParsed.status == "fail") {
                document.getElementById("errorMsg").innerHTML = dataParsed.msg;
            } else {
                window.location.replace("/users");
            }
        }
        //document.getElementById("errorMsg").innerHTML = dataParsed.msg;

    }, queryString);
});