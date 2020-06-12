class UI {
    constructor() {
        this.table = document.querySelector(".assignments");
        this.menu = document.querySelector(".menu");
        this.menuBtn = document.querySelector(".menu-btn");
        this.closeBtn = document.querySelector(".close-btn");
        this.userInput = document.querySelector(".user-input");
        this.searchBtn = document.querySelector(".search");
        this.addBtn = document.querySelector(".add");
        this.employeeBtn = document.querySelector("#employee");

        this.menuBtn.addEventListener("click", () => {
            this.menu.classList.remove("hide-menu");
        });

        this.closeBtn.addEventListener("click", () => {
            this.menu.classList.add("hide-menu");
        });

        this.searchBtn.addEventListener("click", () => {
            const searchParam = this.userInput.value;
            if (searchParam === "") {
                DB.getAllAssignments();
                this.userInput.value = "";
            } else if (this.employeeBtn.checked) {
                const id = DB.getEmployeesByName(searchParam);
                this.userInput.value = "";
            } else {
                const id = DB.getCustomersByName(searchParam);
                this.userInput.value = "";
            }
        });

        this.addBtn.addEventListener("click", () => {
            window.location.href = "assignment.html";
        });

        DB.getAllAssignments();
    }

    updateUI(assignments) {
        let content = "";
        for (const assignment of assignments) {
            content += `<tr>
				<td>${assignment.customer}</td>
				<td>${assignment.employee}</td>
				<td>${assignment.dateAssigned}</td>
				<td>${assignment.completed ? "Complete" : "Incomplete"}</td>
				<td><i class="fas fa-eye eye" data-id="${assignment.assignmentID}"></i></td>
				<td><i class="fas fa-pencil-alt pencil" data-id="${
                    assignment.assignmentID
                }"></i></td>
				<td><i class="fas fa-trash-alt trash" data-id="${
                    assignment.assignmentID
                }"></i></td>
			</tr>`;
        }
        this.table.innerHTML = content;
        const updateBtns = document.querySelectorAll(".pencil");
        const deleteBtns = document.querySelectorAll(".trash");
        const eyeBtns = document.querySelectorAll(".eye");
        updateBtns.forEach((updateBtn) => {
            updateBtn.addEventListener("click", () => {
                const id = updateBtn.getAttribute("data-id");
                window.location.href = `assignment.html?id=${id}`;
            });
        });
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener("click", () => {
                const id = deleteBtn.getAttribute("data-id");
                DB.deleteAssignment(id);
            });
        });
        eyeBtns.forEach((eyeBtn) => {
            eyeBtn.addEventListener("click", () => {
                const id = eyeBtn.getAttribute("data-id");
                DB.getProblemDescription(id);
            });
        });
    }
}

class DB {
    static getAllAssignments() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:5000/assignment", true);

        xhr.onload = function () {
            if (this.status === 200) {
                client.updateUI(JSON.parse(this.response));
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
                DB.getAssignmentsByEmployeesIds(JSON.parse(this.responseText));
            }
        };

        xhr.send();
    }

    static getCustomersByName(name) {
        let xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            `http://localhost:5000/customer/customer-name/${name}`,
            true
        );
        xhr.send();

        xhr.onload = function () {
            if (this.status === 200) {
                DB.getAssignmentsByCustomersIds(JSON.parse(this.responseText));
            }
        };
    }

    static getAssignmentsByEmployeesIds(ids) {
        let requests = 0;
        const responses = [];
        for (const id of ids) {
            requests++;
            new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open(
                    "GET",
                    `http://localhost:5000/assignment/employee-id/${id.employeeID}`,
                    true
                );
                xhr.send();

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject();
                    }
                };
            }).then((res) => {
                responses.push(res);
                if (responses.length === requests) {
                    const assignments = [];
                    for (const response of responses) {
                        if (response.length !== 0) {
                            for (const assignment of response) {
                                assignments.push(assignment);
                            }
                        }
                    }
                    client.updateUI(assignments);
                }
            });
        }
    }

    static getAssignmentsByCustomersIds(ids) {
        let requests = 0;
        const responses = [];
        for (const id of ids) {
            requests++;
            new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open(
                    "GET",
                    `http://localhost:5000/assignment/customer-id/${id.customerID}`,
                    true
                );
                xhr.send();

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject();
                    }
                };
            }).then((res) => {
                responses.push(res);
                if (responses.length === requests) {
                    const assignments = [];
                    for (const response of responses) {
                        if (response.length !== 0) {
                            for (const assignment of response) {
                                assignments.push(assignment);
                            }
                        }
                    }
                    client.updateUI(assignments);
                }
            });
        }
    }

    static getProblemDescription(id) {
        let xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            `http://localhost:5000/assignment/assignment-id/${id}`,
            true
        );
        xhr.onload = function () {
            if (this.status === 200) {
                alert(JSON.parse(xhr.responseText)[0].problemDescription);
            }
        };
        xhr.send();
    }

    static deleteAssignment(id) {
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", `http://localhost:5000/assignment/${id}`, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                DB.getAllAssignments();
            }
        };

        xhr.send();
    }
}

const client = new UI();
