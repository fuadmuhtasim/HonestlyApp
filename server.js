const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const pool = require('./database/database')
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const add = require("./routes/add");
//const signupRoute = require("./routes/signup");
// const cookieParser = require("cookie-parser");


//Serve static files from the 'public' directory using virtual "hidden" path
app.use('/hidden', express.static(path.join(__dirname, 'public')))
//To encode and decode form email data in form
app.use(express.urlencoded({ extended: true }))
//To encode and decode form email data in form
// app.use(cookieParser());

//Serve the index.html file on the root path
app.get('/', (req, res) => {
  if (req) {
    console.log('Request Received')
  } else {
    console.log('Request Error!')
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Handler: Signup Form Submission Endpoint
app.post('/signup_form', signupRoute);
//Handler: Login Form Submission Endpoint
app.post('/login_form', loginRoute);
//Handler: Add Submission Endpoint
app.post('/add', add);

//Listen to the port ->
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
