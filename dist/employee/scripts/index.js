class UI {
    constructor() {
        this.table = document.querySelector(".employees");
        this.menu = document.querySelector(".menu");
        this.menuBtn = document.querySelector(".menu-btn");
        this.closeBtn = document.querySelector(".close-btn");
        this.userInput = document.querySelector(".user-input");
        this.searchBtn = document.querySelector(".search");
        this.addBtn = document.querySelector(".add");

        this.menuBtn.addEventListener("click", () => {
            this.menu.classList.remove("hide-menu");
        });

        this.closeBtn.addEventListener("click", () => {
            this.menu.classList.add("hide-menu");
        });

        this.searchBtn.addEventListener("click", () => {
            const searchParam = this.userInput.value;
            if (searchParam === "") {
                DB.getAllEmployees();
                this.userInput.value = "";
            } else {
                DB.getEmployeesByName(searchParam);
                this.userInput.value = "";
            }
        });

        this.addBtn.addEventListener("click", () => {
            window.location.href = "employee.html";
        });

        DB.getAllEmployees();
    }

    updateUI(employees) {
        let content = "";
        for (const employee of employees) {
            content += `<tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.address}</td>
                <td>${employee.city}</td>
                <td>${employee.state}</td>
                <td>${employee.zip}</td>
                <td>${employee.phone}</td>
                <td><i class="fas fa-pencil-alt pencil" data-id="${employee.employeeID}"></i></td>
                <td><i class="fas fa-trash-alt trash" data-id="${employee.employeeID}"></i></td>
            </tr>`;
        }
        this.table.innerHTML = content;
        const updateBtns = document.querySelectorAll(".pencil");
        const deleteBtns = document.querySelectorAll(".trash");
        updateBtns.forEach((updateBtn) => {
            updateBtn.addEventListener("click", () => {
                const id = updateBtn.getAttribute("data-id");
                window.location.href = `employee.html?id=${id}`;
            });
        });
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener("click", () => {
                const id = deleteBtn.getAttribute("data-id");
                DB.deleteEmployee(id);
            });
        });
    }
}

class DB {
    static getAllEmployees() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:5000/employee", true);

        xhr.onload = function () {
            if (this.status === 200) {
                client.updateUI(JSON.parse(this.responseText));
            }
        };

        xhr.send();
    }

    static getEmployeesByName(name) {
        let xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            `http://localhost:5000/employee/employee-name/${name}`,
            true
        );

        xhr.onload = function () {
            if (this.status === 200) {
                client.updateUI(JSON.parse(this.responseText));
            }
        };

        xhr.send();
    }

    static deleteEmployee(id) {
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", `http:///localhost:5000/employee/${id}`, true);

        xhr.onload = function () {
            if (this.status === 200) {
                window.location.href = "index.html";
            }
        };

        xhr.send();
    }
}

const client = new UI();
