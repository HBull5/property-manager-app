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
			DB.getCustomerByID(this.getId());
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
				if (Validation.validateFields(this.getInput())) {
					DB.updateCustomer(this.getId(), this.getInput());
					window.location.href = "index.html";
				}
			} else {
				if (Validation.validateFields(this.getInput())) {
					DB.addCustomer(this.getInput());
					window.location.href = "index.html";
				}
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
			phone: this.phone.value
		};
	}
}

class Validation {
	static isEmpty(value) {
		if (value === "" || value === "undefined" || value === null) {
			return true;
		} else {
			return false;
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

	static getFieldName(index) {
		if (index === 0) {
			return "First Name";
		} else if (index === 1) {
			return "Last Name";
		} else if (index === 2) {
			return "Address";
		} else if (index === 3) {
			return "City";
		} else if (index === 4) {
			return "State";
		} else if (index === 5) {
			return "Zip";
		}
	}

	static validateFields(customer) {
		const errors = [];
		const inputs = document.querySelectorAll("input");
		for (const key in customer) {
			if (this.isEmpty(customer[key])) {
				errors.push({ error: true, msg: "cannot be blank" });
			} else {
				if (key === "firstName" && this.max(customer[key], 50)) {
					errors.push({ error: false });
				} else if (key === "firstName") {
					errors.push({
						error: true,
						msg: "cannot exceed 50 chars"
					});
				}

				if (key === "lastName" && this.max(customer[key], 50)) {
					errors.push({ error: false });
				} else if (key === "lastName") {
					errors.push({ error: true, msg: "cannot exceed 50 chars" });
				}

				if (key === "address" && this.max(customer[key], 150)) {
					errors.push({ error: false });
				} else if (key === "address") {
					errors.push({
						error: true,
						msg: "cannot exceed 150 chars"
					});
				}

				if (key === "city" && this.max(customer[key], 150)) {
					errors.push({ error: false });
				} else if (key === "city") {
					errors.push({
						error: true,
						msg: "cannot exceed 150 chars"
					});
				}

				if (key === "state" && this.max(customer[key], 2)) {
					errors.push({ error: false });
				} else if (key === "state") {
					errors.push({ error: true, msg: "cannot exceed 2 chars" });
				}

				if (key === "zip" && this.max(customer[key], 5)) {
					errors.push({ error: false });
				} else if (key === "zip") {
					errors.push({ error: true, msg: "cannot exceed 5 chars" });
				}

				if (key === "phone" && this.max(customer[key], 10)) {
					errors.push({ error: false });
				} else if (key === "phone") {
					errors.push({ error: true, msg: "cannot exceed 10 chars" });
				}
			}
		}

		let errorMsgs = "";
		for (let i = 0; i < inputs.length; i++) {
			if (errors[i].error) {
				errorMsgs += `${inputs[i].getAttribute("placeholder")} ${
					errors[i].msg
				}\n`;
				inputs[i].classList.add("error");
				inputs[i].value = "";
			} else {
				inputs[i].classList.remove("error");
			}
		}

		if (errorMsgs === "") {
			return true;
		} else {
			alert(errorMsgs);
			return false;
		}
	}
}

class DB {
	static getCustomerByID(id) {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `http://localhost:5000/customer/customer-id/${id}`, true);

		xhr.onload = function () {
			if (this.status === 200) {
				client.fillFields(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}

	static addCustomer(customer) {
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:5000/customer/add", true);
		xhr.setRequestHeader("Content-type", "application/json");

		xhr.send(JSON.stringify(customer));
	}

	static updateCustomer(id, customer) {
		let xhr = new XMLHttpRequest();
		xhr.open("PUT", `http://localhost:5000/customer/${id}`, true);
		xhr.setRequestHeader("Content-type", "application/json");

		xhr.send(JSON.stringify(customer));
	}
}

const client = new UI();
