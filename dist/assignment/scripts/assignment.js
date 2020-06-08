class UI {
	constructor() {
		this.menu = document.querySelector(".menu");
		this.menuBtn = document.querySelector(".menu-btn");
		this.closeBtn = document.querySelector(".close-btn");
		this.backBtn = document.querySelector(".search");
		this.customerSelect = document.querySelector("#customerID");
		this.employeeSelect = document.querySelector("#employeeID");
		this.incomplete = document.querySelector("#incomplete");
		this.complete = document.querySelector("#complete");
		this.completeSelection = document.querySelector(".selection");

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

		DB.getAllCustomers();
		DB.getAllEmployees();
		if (this.employeeSelect.value === "") {
			this.disableCompleteSection(true);
		}
	}

	fillCustomerID(customers) {
		let content = "";
		for (const customer of customers) {
			content += `<option value="${customer.customerID}">${customer.firstName} ${customer.lastName}</option>`;
		}
		this.customerSelect.innerHTML = content;
	}

	fillEmployeeID(employees) {
		let content = "";
		for (const employee of employees) {
			content += `<option value="${employee.employeeID}">${employee.firstName} ${employee.lastName}</option>`;
		}
		this.employeeSelect.innerHTML += content;
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
}

const client = new UI();
