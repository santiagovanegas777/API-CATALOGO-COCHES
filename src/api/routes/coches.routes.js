const express = require('express');
const upload = require("../../middlewares/upload.file")
const {
    getAllCoches, 
    getCochesId,
    getCochesPrice,
   
    // --------------------
    postCoches, 
    putCoches, 
    deleteCoches, 
    } = require('../controller/coche.controller');

const router = express.Router();

router.get('/', getAllCoches);

router.get('/id/:id', getCochesId);
router.get('/cocheName/:cocheName', getCochesPrice);

// -----------------------------------------
router.post('/', upload.single('cocheImg'), postCoches);
router.put('/:id', upload.single('cocheImg'), putCoches);
router.delete('/:id', deleteCoches);



module.exports = router;