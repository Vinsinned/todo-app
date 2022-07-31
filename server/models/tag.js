var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TagSchema = new Schema(
  {
    name: {type: String, min: 3, max: 100}
  }
);

// Virtual for book's URL
TagSchema
.virtual('url')
.get(function () {
  return '/tag/' + this._id;
});

//Export model
module.exports = mongoose.model('Tag', TagSchema);