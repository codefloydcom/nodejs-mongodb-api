const express = require('express');
const { getSubItems, postSubItems, getSubItem, updateSubItem, removeSubItem } = require('../controllers/mongosubItems');

const SubItem = require('../models/subItem');
const extendedResults = require('../middleware/extendedResults');

const router = express.Router({ mergeParams: true });

// Initialize auth middleware switcher
const { authMiddleware } = require('../auth/switcher');
const { protect, authorize } = authMiddleware();

router.route('/')
        .get(extendedResults(SubItem, {path : 'item', select : 'name'}), getSubItems)
        .post(protect, postSubItems);

router.route('/:id')
        .get(getSubItem)
        .put(protect, updateSubItem)
        .delete(protect, removeSubItem);

module.exports = router;