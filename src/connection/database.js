const mongoose = require("mongoose");
require('dotenv').config();

const mongoDBUri = process.env.MONGO_DB_URI
const DBConnect =  
   mongoose.connect(mongoDBUri);


module.exports = DBConnect;
