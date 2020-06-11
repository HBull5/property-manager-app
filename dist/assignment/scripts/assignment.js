class UI {
	constructor() {
		this.menu = document.querySelector(".menu");
		this.menuBtn = document.querySelector(".menu-btn");
		this.closeBtn = document.querySelector(".close-btn");
		this.backBtn = document.querySelector(".search");
		this.problemDescription = document.querySelector("#problemDescription");
		this.customerSelect = document.querySelector("#customerID");
		this.employeeSelect = document.querySelector("#employeeID");
		this.incomplete = document.querySelector("#incomplete");
		this.complete = document.querySelector("#complete");
		this.completeSelection = document.querySelector(".selection");
		this.goBtn = document.querySelector(".add");
		this.loadStatus = [];
		this.queryString = window.location.search;
		this.update = null;

		this.menuBtn.addEventListener("click", () => {
			this.menu.classList.remove("hide-menu");
		});

		this.closeBtn.addEventListener("click", () => {
			this.menu.classList.add("hide-menu");
		});

		this.backBtn.addEventListener("click", () => {
			window.location.href = "index.html";
		});

		this.employeeSelect.addEventListener("input", (e) => {
			if (e.target.value === "") {
				this.disableCompleteSection(true);
			} else {
				this.disableCompleteSection(false);
			}
		});

		this.goBtn.addEventListener("click", () => {
			if (this.update) {
				DB.updateAssignment(this.getInput());
				window.location.href = "index.html";
			} else {
				DB.addAssignment(this.getInput());
				window.location.href = "index.html";
			}
		});

		DB.getAllCustomers();
		DB.getAllEmployees();
		if (this.employeeSelect.value === "") {
			this.disableCompleteSection(true);
		}
	}

	getId() {
		const urlParams = new URLSearchParams(this.queryString);
		return urlParams.get("id");
	}

	getInput() {
		return {
			problemDescription: this.problemDescription.value,
			customerID: this.customerSelect.value,
			employeeID: this.employeeSelect.value,
			completed: this.incomplete.checked ? 0 : 1
		};
	}

	fillCustomerID(customers) {
		let content = "";
		for (const customer of customers) {
			content += `<option value="${customer.customerID}">${customer.firstName} ${customer.lastName}</option>`;
		}
		this.customerSelect.innerHTML = content;
		this.loadStatus.push(true);
		this.checkLoadStatus();
	}

	fillEmployeeID(employees) {
		let content = "";
		for (const employee of employees) {
			content += `<option value="${employee.employeeID}">${employee.firstName} ${employee.lastName}</option>`;
		}
		this.employeeSelect.innerHTML += content;
		this.loadStatus.push(true);
		this.checkLoadStatus();
	}

	checkLoadStatus() {
		if (this.loadStatus[0] === true && this.loadStatus[1] === true) {
			if (this.queryString !== "") {
				this.update = true;
				DB.getAssignmentByID(this.getId());
			} else {
				this.update = false;
			}
		}
	}

	fillFields(assignment) {
		const customerOptions = document.querySelectorAll("#customerID option");
		const employeeOptions = document.querySelectorAll("#employeeID option");
		assignment = assignment[0];
		this.problemDescription.value = assignment.problemDescription;
		for (const option of customerOptions) {
			if (option.value == assignment.customerID) {
				option.selected = true;
			} else {
				option.selected = false;
			}
		}
		for (const option of employeeOptions) {
			if (option.value == assignment.employeeID) {
				option.selected = true;
			} else {
				option.selected = false;
			}
		}
		if (this.employeeSelect.value === "") {
			this.disableCompleteSection(true);
		} else {
			this.disableCompleteSection(false);
		}
		if (assignment.completed === 0) {
			this.incomplete.checked = true;
			this.complete.checked = false;
		} else {
			this.incomplete.checked = false;
			this.complete.checked = true;
		}
	}

	disableCompleteSection(bool) {
		if (bool) {
			this.completeSelection.classList.add("hidden");
			this.incomplete.checked = true;
			this.complete.checked = false;
		} else {
			this.completeSelection.classList.remove("hidden");
		}
		this.incomplete.disabled = bool;
		this.complete.disabled = bool;
	}
}

class DB {
	static getAllCustomers() {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:5000/customer", true);

		xhr.onload = function () {
			if (this.status === 200) {
				client.fillCustomerID(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}

	static getAllEmployees() {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:5000/employee", true);

		xhr.onload = function () {
			if (this.status === 200) {
				client.fillEmployeeID(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}

	static getAssignmentByID(id) {
		let xhr = new XMLHttpRequest();
		xhr.open(
			"GET",
			`http://localhost:5000/assignment/assignment-id/${id}`,
			true
		);

		xhr.onload = function () {
			if (this.status === 200) {
				client.fillFields(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}

	static addAssignment(assignment) {
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:5000/assignment/add", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(JSON.stringify(assignment));
	}

	static updateAssignment() {}
}

const client = new UI();
