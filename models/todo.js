var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    tag: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    status: {type: String, required: true, enum: ['Unfinished', 'Finished'], default: 'Unfinished'},
    priority: {type: Number},
    deadline: {type: Date}
  }
);

// Virtual for book's URL
TodoSchema
.virtual('url')
.get(function () {
  return '/todo/' + this._id;
});

//Export model
module.exports = mongoose.model('Todo', TodoSchema);