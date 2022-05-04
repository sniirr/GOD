// Import the mongoose module
const mongoose = require('mongoose');

const mongoDB = process.env.MONGO_DB_CONN;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
export const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', () => console.error('MongoDB connection error:'));
