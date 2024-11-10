const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: "sql7.freesqldatabase.com",
    user: "sql7741796",
    password: "LnzSF3L7de",
    database: "sql7741796",
    port: 3306
});

// Login endpoint
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE login = ? AND password = ?";
    
    db.query(sql, [req.body.login, req.body.password], (err, data) => {
        if (err) return res.json("Error");
        if (data.length > 0) {
            return res.json("Login Successfully");
        } else {
            return res.json("No Record");
        }
    });
});

// Registration endpoint
app.post('/register', (req, res) => {
    const { login, password } = req.body;
    const sql = "INSERT INTO login (login, password) VALUES (?, ?)";
    
    db.query(sql, [login, password], (err, result) => {
        if (err) return res.status(500).json("Error");
        return res.status(201).json("User registered successfully");
    });
});

// Update account details endpoint
app.post('/account', (req, res) => {
    const { login, age, gender, weight, goal, height } = req.body;
    
    const sql = "UPDATE login SET age = ?, gender = ?, weight = ?, goal = ?, height = ? WHERE login = ?";

    db.query(sql, [age, gender, weight, goal, height, login], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error updating user details");
        }
        if (result.affectedRows === 0) {
            return res.status(404).json("User not found");
        }
        return res.status(200).json("User details updated successfully");
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001...');
});
