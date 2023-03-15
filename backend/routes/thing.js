const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/thing');

router.post('/', auth, stuffCtrl.createStuff);
router.get('/', auth, stuffCtrl.getAllStuffs);
router.get('/:id', auth, stuffCtrl.getSingleStuff);
router.put('/:id', auth, stuffCtrl.modifyStuff);
router.delete('/:id', auth, stuffCtrl.deleteStuff);

module.exports = router;