'use strict';
var images = ['/img/hero1.jpg', '/img/hero2.jpg', '/img/hero3.jpg', '/img/hero4.jpg'];
var i = 0;
var interval = 3500;

/**
 * Creates a sliding image gallery that automatically updates every specified interval.
 */
function slider() {
    document.getElementById("image").src = images[i];

    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }

    setTimeout("slider()", interval)
}

window.onload = slider;

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

function motivation() {
    ajaxGET("/get-total-purchases", (data) => {
        console.log("hi")
        let parsedData = JSON.parse(data);
        let msg;
        let total = parseInt(parsedData.total);
        if (total == 0) {
            msg = `Thank you for your help`;
        } else if (total > 0 && total < 60) {
            msg = `You have touched the lives of over 5 people`;
        } else if (total > 60) {
            msg = `You have touched the lives of over 10 people`;
        } else if (total > 120) {
            msg = `You have touched the lives of over 15 people`;
        } else if (total > 250) {
            msg = `You have touched the lives of over 25 people`
        }
        document.querySelector("#motivation").innerHTML = msg;
    })

}
motivation();