const path = require('path');
const Item = require('../models/item');
const ErrorResponse = require('../extensions/errorRespose');
const asyncHandler = require('../middleware/async');

// @desc        Get all items
// @route       GET /api/items
// @access      Public
exports.getItems = asyncHandler(async (req, res, next) => {
   
    res.status(200).json(res.extendedResults);
});

// @desc        Get single item
// @route       GET /api/items/:id
// @access      Public
exports.getItem = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);

    if(!item) {
        return next(new ErrorResponse(`Item wasn't found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({success: true, data : item});
});

// @desc        Create new item
// @route       POST /api/items/
// @access      Private
exports.postItem = asyncHandler(async (req, res, next) => {
    const item = await Item.create(req.body);

    res.status(201).json({success: true, data : item});
});

// @desc        Delete single item
// @route       DELETE /api/items/:id
// @access      Private
exports.deleteItem = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    
    if(!item) {
        return next(new ErrorResponse(`Item wasn't found with id of ${req.params.id}`, 404));
    }

    await item.remove();
    res.status(200).json({success: true, data: {} });
});

// @desc        Update single item
// @route       PUT /api/items/:id
// @access      Private
exports.updateItem = asyncHandler(async (req, res, next) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!item) {
        return next(new ErrorResponse(`Item wasn't found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({success: true, data : item });
});

// @desc        Upload image to item
// @route       PUT /api/items/:id/image
// @access      Private
exports.imageUpload = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    
    if(!item) {
        return next(new ErrorResponse(`Item wasn't found with id of ${req.params.id}`, 404));
    }

    if(!req.files) {
        return next(new ErrorResponse(`Image not attached`, 404));
    }

    const file = req.files.file;

    //isImage validation 
    if(!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Image only allowed, attached type is '${file.mimetype}'`, 400));
    }

    // Check filesize
    if(file.size > process.env.FILE_UPLOAD_MAX_SIZE) {
        return next(new ErrorResponse(`Image should be less then ${process.env.FILE_UPLOAD_MAX_SIZE} bytes`, 400));
    }

    // Create custom name
    file.name = `image_${item._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err) {
            console.log(err);
            return next(new ErrorResponse(`Upload problem`, 500));
        }

        await Item.findByIdAndUpdate(req.params.id, { image : file.name });
        res.status(200).json({success: true, data: file.name });
    });
});