var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoinstanceSchema = new Schema(
  {
    todo: { type: Schema.Types.ObjectId, ref: 'Todo', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Unfinished', 'Finished'], default: 'Unfinished'},
    deadline: {type: Date}
  }
);

// Virtual for bookinstance's URL
TodoinstanceSchema
.virtual('url')
.get(function () {
  return '/todoinstance/' + this._id;
});

//Export model
module.exports = mongoose.model('Todoinstance', TodoinstanceSchema);