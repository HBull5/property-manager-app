const mysql = require("mysql");
const express = require("express");
const app = express();

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
