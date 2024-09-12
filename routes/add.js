const { cookieJwtAuth } = require("../middleware/cookieJwtAuth");

module.exports = (req, res) => {
    res.send('<html><body><h1>Add received</h1></body></html>');
};