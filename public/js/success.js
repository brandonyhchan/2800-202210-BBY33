"use strict";

/**
This function makes a post request to the server and takes 3 input.
@param {string} url - the path on the server side that is requested.
@param {callback} callback - some function that is executed after posting.
@param {string} data - data sent to the server side.
*/
function ajaxPOST(url, callback, data) {
    let params = typeof data == "string" ? data : Object.keys(data).map(
        function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) }
    ).join("&");

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        }
    }
    xhr.open("POST", url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
}

/**
 * Displays the information of the Order purchased
 * Total, Destination, Order Number, Dates
 */
function checkout() {
    var buttonId = "";
    var queryString = "buttonID=" + buttonId;
    ajaxPOST("/checkout", function (data) {

        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                console.log("fail");
            } else {
                let str = "Thank you for your purchase, " + dataParsed.userId + "!"; 
                document.getElementById("page-header").innerHTML= str;
                document.getElementById("total-container").innerHTML= "Total: " + "$" + dataParsed.total + ".00";
                document.getElementById("order-number-container").innerHTML= "Order Number: " + dataParsed.order;
                document.getElementById("order-date-container").innerHTML= "Date: " + dataParsed.date.slice(0, 10);
                document.getElementById("order-destination-container").innerHTML = "Destination: " + dataParsed.destination;
            }
        }
    }, queryString);

}

checkout();

/**
 * Adds function to return to landing page.
 */
document.querySelector("#homeButton").addEventListener("click", () => {
    getLanding();
});

/**
 * Async function to redirect to landing page using fetch request
 */
async function getLanding() {
    try {
        let response = await fetch("/landing", {
            method: "GET"
        })
        if (response.status === 200) {
            window.location.replace("/landing");
        }
    } catch (err) {

    }
}