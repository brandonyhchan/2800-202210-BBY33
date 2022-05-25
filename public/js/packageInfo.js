"use strict";

/**
 * Controls the tabbed image gallery in desktop view.
 * @param image is the image that will replace the current main image.
 */
function changeImageTab(image) {
    var switchedImage = document.getElementById("image");
    switchedImage.src = image.src;
}

var packageView = sessionStorage.getItem("package");


let slideIndex = 1;
showImage(slideIndex);

function changeImage(n) {
    showImage(slideIndex += n);
}


/**
 * Controls the scrollable image gallery in mobile view.
 * @param n is the index of the image that will be displayed.
 */
function showImage(n) {
    let i;
    let slides = document.getElementsByClassName("slider");


    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";


}

/**
This function makes a get request to the server and takes 2 inputs.
@param {string} url - the path on the server side that is requested.
@param {callback} callback - some function that is executed after posting.
*/
function ajaxGET(url, callback, data) {
    let params = typeof data == "string" ? data : Object.keys(data).map(
        function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
        }
    ).join("&");
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
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

/**
 * Function that gets the description of the target package.
 */
function getPackage() {
    var packageName = packageView;
    var queryString;
    queryString = "packageName=" + packageName;
    ajaxGET("/display-package", function(data) {
        if (data) {
            let dataParsed = JSON.parse(data);
            if (dataParsed.status == "fail") {
                console.log("fail");
            } else {

                let string = "";
                string += `<h3 id="package-name">${dataParsed.rows[0].package_name}</h3>
                <br>
                <h3 id="price">Price: $${dataParsed.rows[0].package_price}.00</h3>
                <br>
                <p id="description">${dataParsed.rows[0].package_info}</p>
                <br><button class="add-to-cart" id="${dataParsed.rows[0].PACKAGE_ID}">Add to Cart</button><p id="msg"></p>`
                document.getElementById("image").setAttribute("src", dataParsed.rows[0].package_image);
                document.getElementById("package-description").innerHTML = string;
            }
        }
    }, queryString);
}

getPackage();

/**
 * Function to add selected package to shopping cart.
 */
function addPackage() {
    var packageId;
    var queryString;
    let onClick = (event) => {
        if (event.target.className == "add-to-cart") {
            packageId = event.target.id;
            queryString = "packageID=" + packageId;
            ajaxGET("/add-packages", function(data) {

                if (data) {
                    let dataParsed = JSON.parse(data);
                    document.getElementById("msg").innerHTML = dataParsed.msg;
                }
            }, queryString);
        }
    };
    window.addEventListener("click", onClick);
}

addPackage();