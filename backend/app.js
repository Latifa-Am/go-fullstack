const express = require('express');
const app = express();
const mongoose = require('mongoose');

const stuffRouter = require('./routes/thing');

//Connect to mongoDB Atlas 
/**
 * ToDo: edit the url inside the connect() function
 */
mongoose.connect('mongodb://username:password@host:port/database?options...')
.then(() => {
    console.log('Successfully Connected to Mongodb Atlas');
})
.catch((error) => {
    console.log('Unable to Connect to Mongodb');
    console.error(error);
});

//Handle Cors error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, PATCH, OPTIONS');
    next();
});

//Handle incoming POST Requests
app.use(express.json());

app.use('/api/stuff', stuffRouter);

module.exports = app;