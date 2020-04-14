const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectMongoDB = require('./config/db');

// Load middleware
// const logger = require('./middleware/logger');

//Load enviroment config
dotenv.config({path: './config/config.env'});

connectMongoDB();

// Route files
const mongoItems = require('./routes/mongoitems');
const mongoSubItems = require('./routes/mongosubitems');

const app = express();

// Initialize auth route switcher
const { authRouter } = require('./auth/switcher');
const auth = authRouter(app);

//Body parser middleware
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Fileupload middleware
app.use(fileupload());

// Static folders
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/items', mongoItems);
app.use('/api/subitems', mongoSubItems);

if(process.env.AUTH_TYPE === 'JWT') {
    app.use('/api/auth', auth);
}

//Load custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`${process.env.NODE_ENV} server running on port ${PORT}`.yellow.bold.underline));

// Handle exceptions of server
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(()=>process.exit(1));
})