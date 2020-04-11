const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        minlength: [3, 'Not less then 3 characters'],
        maxlength: [10, 'Not more then 10 characters']
    },
    email : {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            'Please add valid mail'
        ]
    },
    description : {
        type : String,
        default : 'None'
    }, 
    number : {
        type : Number,
        default : 100 
    },

    image : String,
    
    manual : {
        type : String
    }
}, {
    toJSON : { virtuals: true},
    toObject : { virtuals : true}
});

// Create manual field before data processing
ItemSchema.pre('save', function(next) {
    this.manual = `${this.name} adjusted`;
    next();
})

// Remove all subitems when parent deleted
ItemSchema.pre('remove', async function(next) {
    await this.model('SubItem').deleteMany({ item : this._id });
    next();
});

// Populate subitems by virtuals
ItemSchema.virtual('subitems', {
    ref: 'SubItem',
    localField : '_id',
    foreignField : 'item',
    justOne : false
});

module.exports = mongoose.model('Item', ItemSchema);