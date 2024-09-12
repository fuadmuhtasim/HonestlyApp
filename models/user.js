const pool = require('./database')

class User {
    constructor(email, password, type) {
        this.email = email;
        this.password = password;
        this.type = type;
    }
}


module.exports = User;