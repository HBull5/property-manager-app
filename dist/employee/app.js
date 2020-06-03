class UI {
    constructor() {
        this.table = document.querySelector(".employees");
        this.menu = document.querySelector(".menu");
        this.menuBtn = document.querySelector(".menu-btn");
        this.closeBtn = document.querySelector(".close-btn");

        this.menuBtn.addEventListener("click", () => {
            this.menu.classList.remove("hide-menu");
        });

        this.closeBtn.addEventListener("click", () => {
            this.menu.classList.add("hide-menu");
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
                <td><i class="fas fa-pencil-alt pencil"></i></td>
                <td><i class="fas fa-trash-alt trash"></i></td>
            </tr>`;
        }
        this.table.innerHTML = content;
    }
}

class DB {
    static getAllEmployees() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:5000/employee", true);

        xhr.onload = function () {
            if (this.status === 200) {
                thisUI.updateUI(JSON.parse(this.responseText));
            }
        };

        xhr.send();
    }

    static getEmployee(name) {}

    static addEmployee(employee) {}

    static updateEmployee(id) {}

    static deleteEmployee(id) {}
}

const thisUI = new UI();
