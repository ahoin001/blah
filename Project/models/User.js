const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({

    username: String,
    password: String,
    email: String,
    imageUrl: String

})

const User = mongoose.model('User', userSchema);

// Export for use in other Files
module.exports = User;