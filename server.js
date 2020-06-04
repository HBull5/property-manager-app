const mysql = require("mysql");
const express = require("express");
const path = require("path");
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

// body-parser middle-wear
app.use(express.json());

// parse employee || customer objs
function parseEmployeeCustomerObj({
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    phone,
}) {
    return [firstName, lastName, address, city, state, zip, phone];
}

// parse assignment objs
/**
 * This might need some work but I think will work
 */
function parseAssignmentObj({
    employeeID,
    customerID,
    problemDescription,
    completed,
}) {
    if (employeeID === "undefined") {
        return [customerID, problemDescription];
    } else {
        return [employeeID, customerID, problemDescription, completed];
    }
}

// get all employees
app.get("/employee", (req, res) => {
    const stmt = "SELECT * FROM employees";
    connection.query(stmt, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// get employees by last name
app.get("/employee/employee-name/:name", (req, res) => {
    const stmt = `SELECT * FROM employees WHERE lastName LIKE ?`;
    connection.query(stmt, `%${req.params.name}%`, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// get employee by id
app.get("/employee/employee-id/:id", (req, res) => {
    const stmt = "SELECT * FROM employees WHERE EmployeeID = ?";
    connection.query(stmt, req.params.id, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
});

// get all customers
app.get("/customer", (req, res) => {});

// get customers by last name
app.get("/customer/customer-name/:name", (req, res) => {});

// get customer by id
app.get("/customer/customer-id/:id", (req, res) => {});

// get all assignments
app.get("/assignment", (req, res) => {
    const stmt = "SELECT * FROM assignments";
    connection.query(stmt, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// get all assignments assigned to an employeeID
app.get("/assignment/employee-id/:id", (req, res) => {});

// get assignment by id
app.get("/assignment/:id", (req, res) => {
    const stmt = "SELECT * FROM assignments WHERE AssignmentID = ?";
    connection.query(stmt, req.params.id, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
});

// create new employee
app.post("/employee/add", (req, res) => {
    const stmt = `INSERT INTO employees
        (firstName, lastName, address, city, state, zip, phone)
        VALUES(?, ?, ?, ?, ?, ?, ?)`;
    connection.query(
        stmt,
        parseEmployeeCustomerObj(req.body),
        (err, result) => {
            if (err) throw err;
            res.status(200).end();
        }
    );
});

// create new customer
app.post("/customer/add", (req, res) => {});

// create new assignment
app.post("/assignment/add", (req, res) => {});

// update employee
app.put("/employee/:id", (req, res) => {
    const stmt = `UPDATE employees SET 
        firstName = ?, lastName = ?, address = ?, city = ?, state = ?, zip = ?, phone = ? 
        WHERE employeeID = ?`;
    const params = parseEmployeeCustomerObj(req.body);
    params.push(req.params.id);
    connection.query(stmt, params, (err, result) => {
        if (err) throw err;
        res.status(200).end();
    });
});

// update customer
app.put("/customer/:id", (req, res) => {});

// assign assignment
app.put("/assignment/assign/:id", (req, res) => {});

// update assignment
app.put("/assignment/update/:id", (req, res) => {});

// delete employee
app.delete("/employee/:id", (req, res) => {
    const stmt = `DELETE FROM employees WHERE employeeID = ?`;
    connection.query(stmt, req.params.id, (err, result) => {
        if (err) throw err;
        res.status(200).end();
    });
});

// delete customer
app.delete("/customer/:id", (req, res) => {});

// delete assignment
app.delete("/assignment/:assignment", (req, res) => {});

// server listens for requests at a specified port
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
});
