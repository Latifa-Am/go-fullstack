const express = require('express');
const app = express();
const mongoose = require('mongoose');
//import the model Thing
const Thing = require('./models/thing');

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
//Handle incoming POST Requests
app.use(express.json());

//Handle Cors error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, PATCH, OPTIONS');
    next();
});
//POST Request (add stuff)
app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
        title : req.body.title,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        price : req.body.price,
        userId : req.body.userId
    });
    thing.save()
    .then(() => {
        res.status(201).json({
            message : 'Stuff added successfully!'
        });
    })
    .catch((error) => {
        res.status(400).json({
            error : error
        });
    }); 
});
//Get Request (Get stuffs)
app.get('/api/stuff', (req, res, next) => {
   Thing.find()
   .then((things) => {
        res.status(200).json(things);
    })
    .catch((error) => {
        res.status(400).json({
            error : error
        });
    }); 
});
//Retrieve a Specific object
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({_id : req.params.id})
    .then((thing) => {
         res.status(200).json(thing);
     })
     .catch((error) => {
         res.status(404).json({
             error : error
         });
     }); 
 });
// Update an existing thing object
app.put('/api/stuff/:id', (req, res, next) => {
    const thing = new Thing({
        _id : req.params.id,
        title : req.body.title,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        price : req.body.price,
        userId : req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing)
    .then(() => {
        res.status(201).json({
            message : 'Stuff updated successfully!'
        }); 
    })
    .catch((error) => {
        res.status(400).json({
            error : error
        });
    }); 
});
// Delete an existing thing object
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id : req.params.id})
    .then(() => {
        res.status(201).json({
            message : 'Stuff deleted successfully!'
        }); 
    })
    .catch((error) => {
        res.status(400).json({
            error : error
        });
    }); 
});
module.exports = app;