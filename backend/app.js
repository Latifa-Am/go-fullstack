const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('Your request was successful!');
    next();
});
  
app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Your request was successful!' });
    next();
});


module.exports = app;