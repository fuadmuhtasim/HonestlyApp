const path = require('path');
const pool = require('../database/database');

module.exports = async (req, res) => {
  console.log('Signup Details Received')
  // Save to database directly from here.
  try {
    //req.body.email and req.body.password needs to be used in ig_token_handling
    const client = await pool.connect()
    try {
      const result = await client.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [req.body.email, req.body.password]
      )
      //signup awaits for a function (waits for a function that)
      // Redirects to site //Instead of a redirection, let's call a function that:
      //(1) Returns a promise: This promise resolves if everything works out before a timeout

          //that redirects to auth page on ig | ig interacts with token handler to give us necessary info
          //authpage calls endpoint on on ig_token_handler
          //ig_token_handler handles token and 

      //res.redirect('https://api.instagram.com/oauth/authorize?client_id=429538809652850&redirect_uri=https://fuadmuhtasim.github.io/&scope=user_profile,user_media&response_type=code');
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