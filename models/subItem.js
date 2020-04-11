const mongoose = require('mongoose');

const SubItemSchema = new mongoose.Schema({
    title: {
        type : String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        minlength: [3, 'Not less then 3 characters'],
        maxlength: [10, 'Not more then 10 characters']
    },
    item: {
        type : mongoose.Schema.ObjectId,
        ref: 'Item',
        required: true
    }
});

module.exports = mongoose.model('SubItem', SubItemSchema);