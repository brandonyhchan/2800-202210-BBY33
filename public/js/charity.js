"use strict";

/**
This function makes a post request to the server and takes 3 input.
@param {string} url - the path on the server side that is requested.
@param {callback} callback - some function that is executed after posting.
@param {string} data - data sent to the server side.
*/
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

/*
Anonymous function added to html element for creating a new package.
Uses a post request to update the database.
*/
document.querySelector("#submit").addEventListener("click", function (e) {
    e.preventDefault();

    let country = document.querySelector("#country_id");
    let package_name = document.getElementById("package_name");
    let package_price = document.getElementById("package_price");
    let package_description = document.getElementById("package_description");
    let long_package_description = document.getElementById("long_description");

    let queryString = "country=" + country.value + "&package=" +
        package_name.value + "&price=" + package_price.value +
        "&description=" + package_description.value +
        "&longdescription=" + long_package_description.value;

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

/*
Function used to upload image of a newly created package.
Uses fetch post request to update database.
*/
function uploadImages() {

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