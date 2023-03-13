const express = require('express');
const app = express();
const Product = require('./models/product');
const mongoose = require('mongoose');

//Connect to mongoDB Atlas 
/**
 * ToDo: edit the url inside the connect() function
 */
mongoose.connect('mongodb://username:password@host:port/database?options...')
.then(() => {console.log('Successfully Connected to Mongodb Atlas');})
.catch((error) => {
    console.log('Unable to Connect to Mongodb');
    console.error(error);
});

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, PATCH, OPTIONS');
    next();
});

// add a new product
app.post('/api/products', (req, res, next) => {
    const product = new Product({
      ...req.body
    });
    product.save()
    .then(() => res.status(201).json({ product }))
    .catch(error => res.status(400).json({ error }));
});
// get all products
app.get('/api/products', (req, res, next) => {
    Product.find()
    .then(products => res.status(200).json({ products }))
    .catch(error => res.status(400).json({ error }));
});
// get a specific product  
app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(404).json({ error }));
});
// update an existing product
app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Modified!'}))
    .catch(error => res.status(400).json({ error }));
});
// delete a product  
app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted!'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;