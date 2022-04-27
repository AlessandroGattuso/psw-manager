const moongose = require('mongoose');


const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const Schema = new moongose.Schema({ //setting the rules with a schema
    firstName: { 
        type: String,
        required: [true],
        trim: true,        //without blank whitespace in name
        maxlength: [30],
    },     
    lastName: { 
      type: String,
      required: [true, 'must provide last name'],
      trim: true,        //without blank whitespace in name
      maxlength: [30],
    },                   
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    masterPassword: {
      type: String,
      trim: true,
      minlength: [5]
    }
  
});

module.exports = moongose.model('users', Schema)