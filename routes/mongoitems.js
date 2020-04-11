const express = require('express');
const { getItem,
        getItems, 
        postItem, 
        deleteItem, 
        updateItem, 
        imageUpload 
} = require('../controllers/mongoitems');

// include resource routers
const subItemRouter = require('./mongosubitems')

const Item = require('../models/item');
const extendedResults = require('../middleware/extendedResults');

const router = express.Router();

// Re-route into other resource routers
router.use('/:itemId/subitems', subItemRouter);



router.route('/')
        .get(extendedResults(Item, 'item'), getItems)
        .post(postItem);
        
router.route('/:id')
        .get(getItem)
        .delete(deleteItem)
        .put(updateItem);

router.route('/:id/image')
        .put(imageUpload);

module.exports = router;