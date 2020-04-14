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

// Initialize auth middleware switcher
const { authMiddleware } = require('../auth/switcher');
const { protect, errorHandler, authorize } = authMiddleware();

// Re-route into other resource routers
router.use('/:itemId/subitems', subItemRouter);

router.route('/')
        .get(extendedResults(Item, 'subitems'), getItems)
        .post(protect,authorize('publisher'), postItem);
        
router.route('/:id')
        .get(getItem)
        .delete(protect, deleteItem)
        .put(protect, updateItem);

router.route('/:id/image')
        .put(protect, authorize('publisher'), imageUpload);

module.exports = router;