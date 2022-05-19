function ajaxPOST(url, callback, data) {
    let params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        }
    }
    xhr.open("POST", url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

function checkout() {
    var buttonId = "";
    var queryString = "buttonID=" + buttonId;
    ajaxPOST("/checkout", function (data) {

        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                console.log("fail");
            } else {
                console.log("success")
                let str = "Your help is on the way " + dataParsed.userId; 
                document.getElementById("success").innerHTML= str;
            }
        }
    }, queryString);

}

checkout();