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
        this.backBtn = document.querySelector(".search");
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

        this.backBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });

        this.goBtn.addEventListener("click", () => {
            if (this.update) {
                DB.updateEmployee(this.getId(), this.getInput());
                window.location.href = "index.html";
            } else {
                DB.addEmployee(this.getInput());
                window.location.href = "index.html";
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

    getInput() {
        return {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            address: this.address.value,
            city: this.city.value,
            state: this.state.value,
            zip: this.zip.value,
            phone: this.phone.value,
        };
    }
}

class Validation {
    static isNotEmpty(value) {
        if (value === "" || value === "undefined" || value === null) {
            return false;
        } else {
            return true;
        }
    }

    static min(value, min) {
        if (min <= value.length) {
            return true;
        } else {
            return false;
        }
    }

    static max(value, max) {
        if (value.length <= max) {
            return true;
        } else {
            return false;
        }
    }

    static minMax(value, min, max) {
        if (min <= value.length <= max) {
            return true;
        } else {
            return false;
        }
    }

    static validateFields(employee) {
        // need to create and return error messages
        const validated = [];
        if (
            this.isNotEmpty(employee.firstName) &&
            this.max(employee.firstName, 50)
        ) {
            validated.push(true);
        } else {
            validated.push(false);
        }

        if (
            this.isNotEmpty(employee.lastName) &&
            this.max(employee.lastName, 50)
        ) {
            validated.push(true);
        } else {
            validated.push(false);
        }

        if (
            this.isNotEmpty(employee.address) &&
            this.max(employee.address, 150)
        ) {
            validated.push(true);
        } else {
            validated.push(false);
        }

        if (this.isNotEmpty(employee.city) && this.max(employee.city, 150)) {
            validated.push(true);
        } else {
            validated.push(false);
        }

        if (this.isNotEmpty(employee.state) && this.max(employee.state, 2)) {
            validated.push(true);
        } else {
            validated.push(false);
        }

        if (this.isNotEmpty(employee.zip) && this.max(employee.zip, 5)) {
            validated.push(true);
        } else {
            validated.push(false);
        }

        if (this.isNotEmpty(employee.phone) && this.max(employee.phone, 10)) {
            validated.push(true);
        } else {
            validated.push(false);
        }
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

    static addEmployee(employee) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:5000/employee/add", true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.send(JSON.stringify(employee));
    }

    static updateEmployee(id, employee) {
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", `http://localhost:5000/employee/${id}`, true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.send(JSON.stringify(employee));
    }
}

const client = new UI();
