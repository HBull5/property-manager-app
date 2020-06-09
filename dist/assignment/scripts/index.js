class UI {
	constructor() {
		this.table = document.querySelector(".assignments");
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
				DB.getAllAssignments();
				this.userInput.value = "";
			} else {
				// does not work //
				const id = DB.getEmployeesByName(searchParam);
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
				DB.getAssignmentsById(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}

	static getCustomersByName(name) {}

	static getAssignmentsById(...ids) {
		const finished = [];
		for (const id of ids) {
			let xhr = new XMLHttpRequest();
			xhr.open("GET", `http://localhost:5000/`);
		}
	}

	static addAssignment() {}

	static updateAssignment() {}

	static deleteAssignment() {}
}

const client = new UI();
