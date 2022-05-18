const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  // unique empeche de creer 2 fois le meme user
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // name: { type: String, required: true },

});

// pour que le champ email soit unique utilisateur doit avoir un email unique
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);