//import the model Thing
const Thing = require('../models/thing');

exports.createStuff = (req, res, next) => {
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
};

exports.getAllStuffs = (req, res, next) => {
    Thing.find()
    .then((things) => {
         res.status(200).json(things);
     })
     .catch((error) => {
         res.status(400).json({
             error : error
         });
     }); 
};

exports.getSingleStuff = (req, res, next) => {
    Thing.findOne({_id : req.params.id})
    .then((thing) => {
         res.status(200).json(thing);
     })
     .catch((error) => {
         res.status(404).json({
             error : error
         });
     }); 
};

exports.modifyStuff = (req, res, next) => {
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
};

exports.deleteStuff = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }).then(
      (thing) => {
        if (!thing) {
          return res.status(404).json({
            error: new Error('Object not found!')
          });
        }
        if (thing.userId !== req.auth.userId) {
          return res.status(401).json({
            error: new Error('unauthorized request!')
          });
        }
        Thing.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
    );
};