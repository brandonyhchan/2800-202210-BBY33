"use strict";

function ajaxPOST(url, callback, data) {
    let params = typeof data == "string" ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
        }
    ).join("&");

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("POST", url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
}


document.querySelector("#submit").addEventListener("click", function (e) {
    e.preventDefault();

    let country = document.querySelector("#country_id");
    let package_name = document.getElementById("package_name");
    let package_price = document.getElementById("package_price");
    let package_description = document.getElementById("package_description");

    let queryString = "country=" + country.value + "&package=" +
        package_name.value + "&price=" + package_price.value +
        "&description=" + package_description.value;

    ajaxPOST("/charity-create", function (data) {

        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                document.getElementById("msg").innerHTML = dataParsed.msg;
            } else {
                window.location.replace("/");
            }
        }
    }, queryString);
});

const upLoadPackage = document.getElementById("package-images");
upLoadPackage.addEventListener("submit", uploadImages);

function uploadImages(e) {
    e.preventDefault();

    const profileLoad = document.querySelector("#upload");
    const imageData = new FormData();

    for (let i = 0; i < profileLoad.files.length; i++) {
        imageData.append("files", profileLoad.files[i]);
    }

    const options = {
        method: "POST",
        body: imageData,
    };

    fetch("/upload-package-images", options).then(function (res) {
        console.log(res);
    }).catch(function (err) {
        ("Error:", err)
    });
}