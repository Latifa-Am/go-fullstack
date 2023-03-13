const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/thing');

router.post('/', stuffCtrl.createStuff);
router.get('/', stuffCtrl.getAllStuffs);
router.get('/:id', stuffCtrl.getSingleStuff);
router.put('/:id', stuffCtrl.modifyStuff);
router.delete('/:id', stuffCtrl.deleteStuff);

module.exports = router;