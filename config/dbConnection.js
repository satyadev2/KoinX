const mongoose = require('mongoose');

const url = process.env.DB_URL;
const dbconnection = async () => {
    await mongoose.connect(url);
}

module.exports = dbconnection;
