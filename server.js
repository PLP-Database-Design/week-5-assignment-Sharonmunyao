require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const PORT = 3000

const app = express()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
   // Question 1 goes here
    app.get("/patients", (req, res) => {
        const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).send('Internal Server Error');
            }
    
            res.json(results);
        });
    });

   // Question 2 goes here
   app.get('/providers', (req, res) => {
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }

        console.log('Query results:', results);
        res.json(results); // Send the results as JSON
    });
});

   // Question 3 goes here
   app.get('/patients', (req, res) => {
    const firstName = req.query.first_name; // Get the first name from the query parameters

    if (!firstName) {
        return res.status(400).send('First name query parameter is required.');
    }

    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';

    db.query(sql, [firstName], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }

        console.log('Query results:', results);
        res.json(results); // Send the results as JSON
    });
});
   // Question 4 goes here
   app.get('/providers', (req, res) => {
    const specialty = req.query.provider_speciality; // Get the specialty from the query parameters

    if (!specialty) {
        return res.status(400).send('Speciality query parameter is required.');
    }

    const sql = 'SELECT first_name, last_name, provider_speciality FROM providers WHERE provider_speciality = ?';

    db.query(sql, [specialty], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Query results:', results);
        res.json(results); // Send the results as JSON
    });
});

   // listen to the server
   app.listen(PORT, () => {
     console.log(`server is running on http://localhost:${PORT}`)
   });

