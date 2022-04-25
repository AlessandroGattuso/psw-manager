const Joi = require('joi');

module.exports = Joi.object({ 
  firstName: Joi.string().min(2).required,  
  LastName: Joi.string().min(2).required,              
  email: Joi.string().email().required(),
  MasterPassword: Joi.string().min(5).required(),
});      
