const mysql = require("mysql");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// create connection object
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "properties"
});

// establish connection
connection.connect((err) => {
	if (err) throw err;
	console.log("DB connection established...");
});

// get all assignments
app.get("/", (req, res) => {});

// get specific assignments
app.get("/:id", (req, res) => {});

// insert new assignment
app.post("/assignment/");

// insert new employee

// update employee

// update assignment

// delete employee

// delete assignment

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}...`);
});
