const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL Configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'juhosi',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// API endpoints
app.post('/signup', (req, res) => {
  const { username, password, role } = req.body;

  const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
  db.query(query, [username, password, role], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      const insertedId = result.insertId;
      const selectQuery = `SELECT * FROM users WHERE id = ?`;
      db.query(selectQuery, [insertedId], (selectErr, selectResult) => {
        if (selectErr) {
          console.log(selectErr);
          res.status(500).json({ message: 'An error occurred' });
        } else if (selectResult.length === 0) {
          res.status(404).json({ message: 'User not found' });
        } else {
          const user = selectResult[0];
          res.status(200).json({
            message: 'User registered successfully',
            role: user.role,
          });
        }
      });
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    } else if (result.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      const user = result[0];
      if (user.role === 'admin') {
        res.status(200).json({ message: 'Login successful', role: 'admin' });
      } else {
        res.status(200).json({ message: 'Login successful', role: 'user' });
      }
    }
  });
});

app.post('/storeDetails', (req, res) => {
  const {
    user_id,
    orderDate,
    company,
    owner,
    item,
    quantity,
    weight,
    shipmentRequest,
    trackingId,
    shipmentSize,
    boxCount,
    specification,
    checklistQuantity,
  } = req.body;

  const query = `INSERT INTO customer (user_id,order_date, company, owner, item, quantity, weight, shipment_request, tracking_id, shipment_size, box_count, specification, checklist_quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [
      user_id,
      orderDate,
      company,
      owner,
      item,
      quantity,
      weight,
      shipmentRequest,
      trackingId,
      shipmentSize,
      boxCount,
      specification,
      checklistQuantity,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred' });
      } else {
        res.status(200).json({ message: 'Details stored successfully' });
      }
    }
  );
});
app.get('/adminData/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT user_id, SUM(quantity) AS total_quantity, SUM(weight) AS total_weight, SUM(box_count) AS total_box_count
    FROM customer
    WHERE user_id = ?
    GROUP BY user_id;
  `;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/adminData', (req, res) => {
  const totalQuery = `
    SELECT 
      SUM(quantity) AS total_quantity,
      SUM(weight) AS total_weight,
      SUM(box_count) AS total_box_count
    FROM customer
  `;

  const userIdQuery = `
    SELECT 
      user_id,
      SUM(quantity) AS total_quantity,
      SUM(weight) AS total_weight,
      SUM(box_count) AS total_box_count
    FROM customer
    GROUP BY user_id
  `;

  db.query(totalQuery, (errTotal, resultTotal) => {
    if (errTotal) {
      console.log(errTotal);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      const totalResult = resultTotal[0];

      db.query(userIdQuery, (errUserId, resultUserId) => {
        if (errUserId) {
          console.log(errUserId);
          res.status(500).json({ message: 'An error occurred' });
        } else {
          const userIdResult = resultUserId;

          res.status(200).json({ totalResult, userIdResult });
        }
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
