const path = require('path');
const pool = require('../database/database');
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (req, res) => {
  if (req) {
    console.log('Login Details Received')
  } else {
    console.log('Login Form Error!')
  }
  try {
    const client = await pool.connect()
    try {
      const result = await client.query(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [req.body.email, req.body.password]
      )

      if (result.rows.length > 0) {
        // Email and password match
        console.log('User found!', result.rows[0])

        const token = jwt.sign({userId: result.rows[0].id}, process.env.MY_SECRET, {expiresIn: "1h"});
        res.cookie("token", token,{
            httpOnly: true
        });
        res.sendFile(path.join(__dirname, '../public', 'landingpage.html'))
      } else {
        // No match found
        console.log('Invalid email or password')
        res.send('User Not Found!')
      }
    } catch (err) {
      console.error('Error executing query:', err)
      res.status(500).send('Error processing your request')
    } finally {
      client.release()
    }
  } catch (err) {
    console.error('Error in Database connection:', err) // Corrected to `err`
    res.status(500).send('Database connection failed')
  }

};