const express = require('express');
const { getSubItems, postSubItems, getSubItem, updateSubItem, removeSubItem } = require('../controllers/mongosubItems');

const SubItem = require('../models/subItem');
const extendedResults = require('../middleware/extendedResults');

const router = express.Router({ mergeParams: true });

router.route('/')
        .get(extendedResults(SubItem, {path : 'item', select : 'name'}), getSubItems)
        .post(postSubItems);

router.route('/:id')
        .get(getSubItem)
        .put(updateSubItem)
        .delete(removeSubItem);

module.exports = router;