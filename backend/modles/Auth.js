
const mongoose = require('mongoose');

const authschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true,
      
    },
    conformpass: {
        type: String,
        required: true,
       
    },
    // role: ['register', 'login']
})
const authschemadata = mongoose.model('authdatabase', authschema);
module.exports = authschemadata;