const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({

    username: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
    profilepic: String,
    recipes: [ { type : Schema.Types.ObjectId, ref: 'Recipe' } ]

})

const User = mongoose.model('User', userSchema);
mongoose.set('useFindAndModify', false);
// Export for use in other Files
module.exports = User;