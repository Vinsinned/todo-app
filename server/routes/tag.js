const express = require("express");
 
// tagRoute is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /tag.
const tagRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../MongooseConn.js");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
tagRoutes.route("/tags/search").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
   .collection("tags")
   .find({ name: { "$regex": req.query.name, "$options": "i"} })
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
 });
 
// This section will help you get a list of all the records.
tagRoutes.route("/tags").get(function (req, res) {
 let db_connect = dbo.getDb("to_do_app");
 db_connect
   .collection("tags")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single tag by id
tagRoutes.route("/tags/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect
     .collection("tags")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// This section will help you create a new tag.
tagRoutes.route("/tags/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
 };
 db_connect.collection("tags").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a tag by id.
tagRoutes.route("/tags/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb(); 
  let myquery = { _id: ObjectId( req.params.id )}; 
  let newvalues = {   
   $set: {     
     name: req.body.name,
   }, 
  };
  db_connect
   .collection("todos")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a tag
tagRoutes.route("/tags/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("tags").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   //Change this to be a notification maybe...
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = tagRoutes;