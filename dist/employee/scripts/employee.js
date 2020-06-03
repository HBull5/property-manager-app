class UI {
    constructor() {
        this.update = null;
        this.firstName = document.querySelector("#first");
        this.lastName = document.querySelector("#last");
        this.address = document.querySelector("#address");
        this.city = document.querySelector("#city");
        this.state = document.querySelector("#state");
        this.zip = document.querySelector("#zip");
        this.phone = document.querySelector("#phone");
        this.queryString = window.location.search;
        this.menu = document.querySelector(".menu");
        this.menuBtn = document.querySelector(".menu-btn");
        this.closeBtn = document.querySelector(".close-btn");
        this.goBtn = document.querySelector(".add");

        if (this.queryString !== "") {
            this.update = true;
            DB.getEmployeeById(this.getId());
        } else {
            this.update = false;
        }

        this.menuBtn.addEventListener("click", () => {
            this.menu.classList.remove("hide-menu");
        });

        this.closeBtn.addEventListener("click", () => {
            this.menu.classList.add("hide-menu");
        });

        this.goBtn.addEventListener("click", () => {
            if (this.update) {
                DB.updateEmployee();
            } else {
                DB.addEmployee();
            }
        });
    }

    getId() {
        const urlParams = new URLSearchParams(this.queryString);
        return urlParams.get("id");
    }

    fillFields(values) {
        values = values[0];
        this.firstName.value = values.firstName;
        this.lastName.value = values.lastName;
        this.address.value = values.address;
        this.city.value = values.city;
        this.state.value = values.state;
        this.zip.value = values.zip;
        this.phone.value = values.phone;
    }
}

class DB {
    static getEmployeeById(id) {
        let xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            `http://localhost:5000/employee/employee-id/${id}`,
            true
        );

        xhr.onload = function () {
            if (this.status === 200) {
                client.fillFields(JSON.parse(this.responseText));
            }
        };

        xhr.send();
    }

    static addEmployee(employee) {}

    static updateEmployee(id) {}
}

const client = new UI();
