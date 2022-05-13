'use strict';

var buttons;
var packagesDisplayed = false;

function ajaxGET(url, callback, data) {
    let params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
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

function getPackage() {
    var countryId;
    var countryName;
    var queryString;
    let onClick = (event) => {
        countryId = event.target.id;
        countryId = countryId.slice(7);
        countryName = "Ukraine";
        queryString = "countryID=" + countryId + "&countryName=" + countryName;
        ajaxGET("/get-packages", function (data) {

            if (data) {
                let dataParsed = JSON.parse(data);
                if (dataParsed.status == "fail") {
                    console.log("fail");
                } else {
                    let str = ""
                    for (let i = 0; i < dataParsed.rows.length; i++) {
                        let row = dataParsed.rows[i];
                        str += (`<div class='card'> 
                            <div id='title'>${row.package_name} 
                            </div><div class='pImage'><img width='100' height='100' src="${row.package_image}">
                            </div><div class='price'> $${row.package_price} 
                            </div><div class='description'>${row.description_of_package}
                            </div><div><button type='button' class='packages' id='${row.package_id}'>Add</button><button type='button' class='packagesDisplay' id='${row.package_name}'>More info</button></div></div></div></div>`);
                    }
                    document.getElementById("cart").innerHTML = str;
                }
            }
        }, queryString);
    };
    let records = document.querySelectorAll(".countries");
    for (let j = 0; j < records.length; j++) {
        records[j].addEventListener("click", onClick);
    }
}

getPackage();

function addPackage() {
    var packageId;
    var queryString;
    let onClick = (event) => {
        if (event.target.className == "packages") {
            packageId = event.target.id;
            queryString = "packageID=" + packageId;
            console.log(queryString);
            ajaxGET("/add-packages", function (data) {

                if (data) {
                    let dataParsed = JSON.parse(data);
                    if (dataParsed.status == "fail") {
                        console.log("fail");
                    } else {
                        console.log("success")
                    }
                }
            }, queryString);
        }
    };
    window.addEventListener('click', onClick);
};

function displayPackage() {
    var packageId;
    let onClick = (event) => {
        if (event.target.className == "packagesDisplay") {
            packageId = event.target.id;
            sessionStorage.setItem("package", packageId);
            showPackage();
        }
    };
    window.addEventListener('click', onClick);
};


async function showPackage() {
    try {
        let response = await fetch("/packageInfo", {
            method: 'GET'
        })
        if (response.status === 200) {
            window.location.replace("/packageInfo");
        }
    } catch (err){

    }
}

displayPackage();

addPackage();
