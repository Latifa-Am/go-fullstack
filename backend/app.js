const express = require('express');
const app = express();

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
    console.log(req.body);
    res.status(201).json({
        message : 'Stuff added successfully!'
    });
});
//Get Request (Get stuffs)
app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id : 'id_stuff_01',
            title : 'stuff 01',
            description : 'desc stuff 1', 
            imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Canon_Canonet_17_GL-III_QL.jpg/1920px-Canon_Canonet_17_GL-III_QL.jpg',
            price : 230, 
            userId : 'User_ciio_239'
        },
        {
            _id : 'id_stuff_02',
            title : 'stuff 02',
            description : 'desc stuff 2', 
            imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Canon_pellix.jpg',
            price : 290, 
            userId : 'User_cvdf_99'
        }
    ];
    res.status(200).json(stuff);
});


module.exports = app;