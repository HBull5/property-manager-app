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

		/**
		 * Need to add functionality for if is an employee or customer search
		 */
		this.searchBtn.addEventListener("click", () => {
			const searchParam = this.userInput.value;
			if (searchParam === "") {
				DB.getAllAssignments();
				this.userInput.value = "";
			} else {
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
				DB.getAssignmentsByIds(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}

	static getCustomersByName(name) {}

	static getAssignmentsByIds(ids) {
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
					console.log(assignments);
					client.updateUI(assignments);
				}
			});
		}
	}

	static addAssignment() {}

	static updateAssignment() {}

	static deleteAssignment() {}
}

const client = new UI();
