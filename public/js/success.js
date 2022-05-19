function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

function checkout() {
    buttonId = "";
    queryString = "buttonID=" + buttonId;
    ajaxGET("/checkout", function (data) {

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