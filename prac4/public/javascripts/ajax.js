$(() => {

    // task 4 - 1;

    (() => {

        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200 && this.responseText !== "") {
                $('#request_for_last').text(
                    `
                    This page was last viewed ${this.responseText}
                    `
                );

            }
        };

        xhttp.open("GET", "/last.txt", true);
        xhttp.send();

    })();





    }
);
