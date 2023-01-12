const mongoose = require('mongoose');

const connectDB = async() => {
try{
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`The Server has connected:  ${db.connection.host}`);
}catch(e){
    console.log("Error", e);
    process.exit(1);
    }
}

module.exports = connectDB;