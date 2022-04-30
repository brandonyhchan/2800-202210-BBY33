'use strict';
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
ajaxGET("/table", function (data) {
    let display = document.querySelector("#userTable");
    display.innerHTML = data;
    document.querySelector(".remove").addEventListener("click", () => {
        ajaxGET("/user-update/:userId", (data) => {
            
        })
        ajaxGET("/table", function (data) {
            let display = document.querySelector("#userTable");
            display.innerHTML = data;
        });
    })
});




