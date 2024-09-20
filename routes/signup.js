const path = require('path');
const pool = require('../database/database');

module.exports = async (req, res) => {
  console.log('Signup Details Received')
  // Save to database directly from here.
  try {
    const client = await pool.connect()
    try {
      const result = await client.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [req.body.email, req.body.password]
      )
      // Redirects to site
      res.redirect('https://api.instagram.com/oauth/authorize?client_id=429538809652850&redirect_uri=https://fuadmuhtasim.github.io/&scope=user_profile,user_media&response_type=code');
      // After getting on that landing page: I get this token that I need to catch from the uri
    } finally {
      client.release()
    }
  } catch (err) {
    if (err.code === '23505') {
      // Unique violation error code in PostgreSQL
      console.error('Error: Email already exists')
      res.status(400).json({ error: 'Email already exists' })
    } else {
      console.error('Database Error:', err)
      res.status(500).send('Server Error')
    }
  }
}