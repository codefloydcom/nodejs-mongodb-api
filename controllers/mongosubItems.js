const SubItem = require('../models/subItem');
const Item = require('../models/item');
const ErrorResponse = require('../extensions/errorRespose');
const asyncHandler = require('../middleware/async');

// @desc        Get all sub-items
// @route       GET /api/subitems
// @route       GET /api/items/:id/subitems
// @access      Public
exports.getSubItems = asyncHandler(async (req, res, next) => {
    if(req.params.itemId) {
        const subItems = await SubItem.find({ item: req.params.itemId }).populate({path : 'item', select : 'name'})
        res.status(200).json({success: true, count: subItems.length, data : subItems});
    } else {
        res.status(200).json(res.extendedResults);
    }
});


// @desc        Create new sub-item
// @route       POST /api/items/:id/subitems
// @access      Private
exports.postSubItems = asyncHandler(async (req, res, next) => {
    req.body.item = req.params.itemId
    const item = await Item.findById(req.params.itemId);

    if(!item) {
        return next(new ErrorResponse(`Item wasn't found with id of ${req.params.itemId}`, 404));
    }
    
    const subItem = await SubItem.create(req.body);

    res.status(201).json({success: true, data : subItem});
});


// @desc        Get single sub-item
// @route       GET /api/subitems/:id
// @access      Public
exports.getSubItem = asyncHandler(async (req, res, next) => {
    const subItem = await SubItem.findById(req.params.id).populate('item');

    if(!subItem) {
        return next(new ErrorResponse(`Subitem wasn't found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({success: true,  data : subItem});
});

// @desc        Update single sub-item
// @route       PUT /api/subitems/:id
// @access      Private
exports.updateSubItem = asyncHandler(async (req, res, next) => {
    const subItem = await SubItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true  })
                                    .populate('item');
    
    if(!subItem) {
        return next(new ErrorResponse(`Subitem wasn't found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({success: true, data : subItem});
});

// @desc        Delete single sub-item
// @route       DELETE /api/subitems/:id
// @access      Private
exports.removeSubItem = asyncHandler(async (req, res, next) => {
    const subItem = await SubItem.findById(req.params.id)
    
    if(!subItem) {
        return next(new ErrorResponse(`Subitem wasn't found with id of ${req.params.id}`, 404));
    }
    await subItem.remove();
    
    res.status(200).json({success: true, data : {}});
});