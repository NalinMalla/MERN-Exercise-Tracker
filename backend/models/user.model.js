const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema = new schema(
  {
    userName: {
      firstName: {
        type: String,
        required: [true, "Username is mandatory."],       //  Or just >required: true,< works as well, if you want to forgo the error messages.
        minlength: [1, "Username cannot be blank."],
        maxlength: [32, "Username must be 32 characters at maximum."],
    },
    middleName: {
        type: String,   
        maxlength: [32, "Middle Name must be 32 characters at maximum."],
    },
    familyName: {
        type: String,  
        maxlength: [32, "Family Name must be 32 characters at maximum."],
    },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
