
const mongoose = require('mongoose');
require("dotenv").config()

const connection = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log('Connected to MongoDB');

module.exports = {
connection
}

