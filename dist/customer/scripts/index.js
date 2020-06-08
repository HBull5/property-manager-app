class UI {
	constructor() {
		this.table = document.querySelector(".customers");
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
				DB.getAllCustomers();
				this.userInput.value = "";
			} else {
				DB.getCustomersByName(searchParam);
				this.userInput.value = "";
			}
		});

		this.addBtn.addEventListener("click", () => {
			window.location.href = "customer.html";
		});

		DB.getAllCustomers();
	}

	updateUI(customers) {
		let content = "";
		for (const customer of customers) {
			content += `<tr>
                <td>${customer.firstName}</td>
                <td>${customer.lastName}</td>
                <td>${customer.address}</td>
                <td>${customer.city}</td>
                <td>${customer.state}</td>
                <td>${customer.zip}</td>
                <td>${customer.phone}</td>
                <td><i class="fas fa-pencil-alt pencil" data-id="${customer.customerID}"></i></td>
                <td><i class="fas fa-trash-alt trash" data-id="${customer.customerID}"></i></td>
            </tr>`;
		}
		this.table.innerHTML = content;
		const updateBtns = document.querySelectorAll(".pencil");
		const deleteBtns = document.querySelectorAll(".trash");
		updateBtns.forEach((updateBtn) => {
			updateBtn.addEventListener("click", () => {
				const id = updateBtn.getAttribute("data-id");
				window.location.href = `customer.html?id=${id}`;
			});
		});
		deleteBtns.forEach((deleteBtn) => {
			deleteBtn.addEventListener("click", () => {
				const id = deleteBtn.getAttribute("data-id");
				DB.deleteCustomer(id);
			});
		});
	}
}

class DB {
	static getAllCustomers() {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:5000/customer", true);

		xhr.onload = function () {
			if (this.status === 200) {
				client.updateUI(JSON.parse(this.responseText));
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

		xhr.onload = function () {
			if (this.status === 200) {
				client.updateUI(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}

	static deleteCustomer(id) {
		let xhr = new XMLHttpRequest();
		xhr.open("DELETE", `http://localhost:5000/customer/${id}`, true);

		xhr.onload = function () {
			if (this.status === 200) {
				window.location.href = "index.html";
			}
		};

		xhr.send();
	}
}

const client = new UI();
