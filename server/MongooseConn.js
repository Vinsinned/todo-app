//File to connect routes to the database
const { MongoClient } = require("mongodb");
//Require to be able to use environment variables
require("dotenv").config({ path: "./config.env" });
const Db = process.env.ATLAS_URI;
console.log(process.env.ATLAS_URI)
const client = new MongoClient(Db, {useNewUrlParser: true, useUnifiedTopology: true});

var _db;

module.exports = {
	connectToServer: function (callback) {
	client.connect(function (err, db) {
		// Verify we got a good "db" object
		if (db)
			{
				_db = db.db("to_do_app");
				console.log("Successfully connected to MongoDB."); 
			}
			return callback(err);
		});
	},
	
	getDb: function () {
		return _db;
	},
};