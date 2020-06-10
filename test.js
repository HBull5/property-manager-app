class AJAX {
    static request() {
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open(
                "GET",
                "http://localhost:5000/assignment/employee-id/8",
                true
            );
            xhr.send();

            xhr.onload = function () {
                if (this.status === 200) {
                    res(this.responseText);
                } else {
                    rej();
                }
            };
        });
    }
}

// const arr = [];
AJAX.request()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
