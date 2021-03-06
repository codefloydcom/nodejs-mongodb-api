const mongoose = require('mongoose');

const connectMongoDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.blue.bold);
}

module.exports = connectMongoDB;