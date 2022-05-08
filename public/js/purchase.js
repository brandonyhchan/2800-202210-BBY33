'use strict';

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


document.querySelector(".UA").addEventListener("click", function (e) {
    e.preventDefault();
    var countryId;
    var countryName;
    var queryString;
    const onClick = (event) => {
        console.log(event.target.id);
        countryId = event.target.id;
        console.log(countryId);
        countryName = "Ukraine";
        queryString = "countryID=" + countryId + "&countryName=" + countryName;
        console.log(queryString);
        ajaxGET("/get-packages", function (data) {

            if (data) {
                let dataParsed = JSON.parse(data);
                if (dataParsed.status == "fail") {
                    console.log("fail");
                } else {
                    console.log("This is data" + data);
                    console.log("This is data" + dataParsed.rows.length);
                    let str = `        <tr>
                    <th class="firstName_header"><span>Package name</span></th>
                    <th class="lastName_header"><span>package price</span></th>
                    <th class="email_header"><span>Description</span></th>
                    </tr>`;
                    for (let i = 0; i < dataParsed.rows.length; i++) {
                        let row = dataParsed.rows[i];
                        str += ("<tr>" +
                            "<td class='firstName'>" + row.package_name +
                            "</td><td class='lastName'>" + row.package_price +
                            "</td><td class='email'>" + row.description_of_package +
                            "</td></tr>");
                    }
                    document.getElementById("cart").innerHTML = str
                }
            }
        }, queryString);
    };
    let records = document.querySelectorAll(".UA");
    for (let j = 0; j < records.length; j++) {
        records[j].addEventListener("click", onClick);
    }

});