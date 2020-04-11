# Mongoose documentation


## Models
[More information about schema options, validators and types](https://mongoosejs.com/docs/api.html#SchemaTypeOptions)

> Examples
```
type: String,
required: [true, 'Validation message'],
unique: true,
trim: true,
maxlength: [50, 'Validation message'],
minlength: [5, 'Validation message']
default: 'DEFAULT STRING'
```
```
match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS'
```
```
match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
```
```
enum: [
        'Text 1',
        'Text 2',
        'Text 3',
      ]
```
[[Main]](/readme.md#usage)


## Hooks
Used to execute some actions before/after document saved in MongoDB

[Documentation](https://mongoosejs.com/docs/middleware.html#order)

> Examples
```
schema.post('validate', function() {
  console.log('after save');
  next();
});

schema.pre('save', function() {
  console.log('before save'');

  this.date = new Date();

  next();
});
```
> ***__"this"__*** represent reference to current document

[[Main]](/readme.md#usage)


## Reference
> Response include parent into the child

```
# Reference field

parent_name: {
    type : mongoose.Schema.ObjectId,
    ref: 'Parent_item_ref',
    required: true
}
```
- .populate('parent_name');

[[Main]](/readme.md#usage)


## Virtual reference
> Response include all childs into the parent

```
Schema.virtual('ref_name', {
  ref: 'Child_schema_ref',
  localField: '_id',
  foreignField: 'child_ref',
  justOne: false
});
```
- ref_name  - ___this reference will be used in .populate('ref_name');___
- Child_schema_ref - ___Child schema reference from mongoose.model('Child_schema_ref', Schema);___
- foreignField - ___Child schema object which referenced to parent___

```
# foreignField

foreignField: {
    type : mongoose.Schema.ObjectId,
    ref: 'Parent_item_ref',
    required: true
}
```
[[Main]](/readme.md#usage)

[[Top]](/documentation/mongoose.md#Mongoose-documentation)