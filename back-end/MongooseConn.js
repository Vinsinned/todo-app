var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://vinsinned:1@cluster0.xj6oiga.mongodb.net/to_do_app?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', function(err) {
    console.error.bind('Mongoose connection error occured ' + error);
});

module.exports = db