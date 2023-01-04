const express = require("express");
 
// categoryRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /categories.
const categoryRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../MongooseConn.js");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
// This section will help you get a list of all the records.
categoryRoutes.route("/categories").get(function (req, res) {
 let db_connect = dbo.getDb("to_do_app");
 db_connect
   .collection("categories")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// Search for category
categoryRoutes.route("/categories/search").get(function (req, res) {
  let db_connect = dbo.getDb("to_do_app");
  let myquery = { name: req.query.category }
  db_connect
   .collection("categories")
   .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
   });
 });

  //get a list of categories matching search
  categoryRoutes.route("/categories/get").get(function (req, res) {
    let db_connect = dbo.getDb("to_do_app");
    db_connect
     .collection("categories")
     .find({ name: { "$regex": req.query.value, "$options": "i"} })
     .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
     });
  });

//get a count of all todos in a category
categoryRoutes.route("/categories/count").get((req, res) => {
  let db_connect = dbo.getDb("to_do_app");
  db_connect
  .collection("todos")
  .countDocuments({category: { "$regex": req.query.category, "$options": "i"}}, function (err, result) {
    if (err) {
      res.json('error');
    } else {
      res.json({count: result});
    }
  });
});
 
// This section will help you get a single category by id
categoryRoutes.route("/categories/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect
     .collection("categories")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// This section will help you create a new category.
categoryRoutes.route("/categories/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.value,
   color: {
    colorHex: "#78909C",
    colorName: "Regent Gray"
   },
   favorite: false
 };
 db_connect.collection("categories").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a category by id.
categoryRoutes.route("/categories/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb(); 
  let myquery = { _id: ObjectId( req.params.id )}; 
  let newvalues = {   
   $set: {     
     name: req.body.name,
   }, 
  };
  db_connect
   .collection("categories")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     response.json(res);
   });
});
 
// This section will help you delete a category
categoryRoutes.route("/categories/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("categories").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   response.json(obj);
 });
});
 
module.exports = categoryRoutes;