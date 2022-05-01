
    function ajaxPOST(url, callback, data) {
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');
        console.log("params in ajaxPOST", params);

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

    document.querySelector("#submit").addEventListener("click", function (e) {
        e.preventDefault();
        let user_name = document.getElementById("user_name");
        let password = document.getElementById("password");
        let queryString = "user_name=" + user_name.value + "&password=" + password.value;
        const vars = { "user_name": user_name, "password": password }
        ajaxPOST("/login", function (data) {

            if (data) {
                let dataParsed = JSON.parse(data);
                console.log(dataParsed);
                if (dataParsed.status == "fail") {
                    document.getElementById("errorMsg").innerHTML = dataParsed.msg;
                } else {
                    window.location.replace("/landing");
                }
            }
        }, queryString);
    });

    document.getElementById("deleteAll").addEventListener("click", function(e) {
            e.preventDefault();

            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE) {

                    // 200 means everthing worked
                    if (xhr.status === 200) {

                      getCustomers();
                      document.getElementById("status").innerHTML = "All records deleted.";

                    } else {

                      // not a 200, could be anything (404, 500, etc.)
                      console.log(this.status);

                    }

                } else {
                    console.log("ERROR", this.status);
                }
            }
            xhr.open("POST", "/delete-all-customers");
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send();
        });

