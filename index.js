const mysql = require("mysql");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// create connection object
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "properties",
});

// establish connection
connection.connect((err) => {
    if (err) throw err;
    console.log("DB connection established...");
});

// get all employees
app.get("/employee", (req, res) => {
    const stmt = "SELECT * FROM employees";
    connection.query(stmt, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// get specific employee
app.get("/employee/:id", (req, res) => {
    const stmt = "SELECT * FROM employees WHERE EmployeeID = ?";
    connection.query(stmt, req.params.id, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
});

// get all assignments
app.get("/assignment", (req, res) => {
    const stmt = "SELECT * FROM assignments";
    connection.query(stmt, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// get specific assignment
app.get("/assignment/:id", (req, res) => {
    const stmt = "SELECT * FROM assignments WHERE AssignmentID = ?";
    connection.query(stmt, req.params.id, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
});

// create new employee
app.post("/employee/:employee", (req, res) => {});

// create new assignment
app.post("/assignment/:assignment", (req, res) => {});

// update employee
app.put("/employee/:employee", (req, res) => {});

// assign assignment
app.put("/assignment/assign/:employee", (req, res) => {});

// update assignment
app.put("/assignment/update/:assignment", (req, res) => {});

// delete employee
app.delete("employee/:employee", (req, res) => {});

// delete assignment
app.delete("assignment/:assignment", (req, res) => {});

// server listens for requests at a specified port
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
});
