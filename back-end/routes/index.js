var express = require('express');
var router = express.Router();

// Require controller modules.
var todo_controller = require('../controllers/todoController');
var category_controller = require('../controllers/categoryController');
var tag_controller = require('../controllers/tagController');
var todo_instance_controller = require('../controllers/todoinstanceController');

/// TODO ROUTES ///

//GET and REDIRECT to todo home page
router.get('/', function(req, res) {
  res.redirect('/home');
});

// GET todo home page.

router.get('/template', function(req, res) {
  res.render('test.pug', { title: 'Pug Templating Primer' })
});

router.get('/home', todo_controller.index);

// GET request for creating a todo. NOTE This must come before routes that display Book (uses id).
router.get('/todo/create', todo_controller.todo_create_get);

// POST request for creating todo.
router.post('/todo/create', todo_controller.todo_create_post);

// GET request to delete todo.
router.get('/todo/:id/delete', todo_controller.todo_delete_get);

// POST request to delete todo.
router.post('/todo/:id/delete', todo_controller.todo_delete_post);

// GET request to update todo.
router.get('/todo/:id/update', todo_controller.todo_update_get);

// POST request to update todo.
router.post('/todo/:id/update', todo_controller.todo_update_post);

// GET request for one todo.
router.get('/todo/:id', todo_controller.todo_detail);

// GET request for list of all todo items.
router.get('/todos', todo_controller.todo_list);

/// CATEGORY ROUTES ///

// GET request for creating Category. NOTE This must come before route for id (i.e. display category).
router.get('/category/create', category_controller.category_create_get);

// POST request for creating Category.
router.post('/category/create', category_controller.category_create_post);

// GET request to delete Category.
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete Category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update Category.
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update Category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one Category.
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all Categories.
router.get('/categories', category_controller.category_list);

/// TAG ROUTES ///

// GET request for creating a Tag. NOTE This must come before route that displays Tag (uses id).
router.get('/tag/create', tag_controller.tag_create_get);

//POST request for creating Tag.
router.post('/tag/create', tag_controller.tag_create_post);

// GET request to delete Tag.
router.get('/tag/:id/delete', tag_controller.tag_delete_get);

// POST request to delete Tag.
router.post('/tag/:id/delete', tag_controller.tag_delete_post);

// GET request to update Tag.
router.get('/tag/:id/update', tag_controller.tag_update_get);

// POST request to update Tag.
router.post('/tag/:id/update', tag_controller.tag_update_post);

// GET request for one Tag.
router.get('/tag/:id', tag_controller.tag_detail);

// GET request for list of all Tags.
router.get('/tags', tag_controller.tag_list);

/// TODOINSTANCE ROUTES ///

// GET request for creating a TodoInstance. NOTE This must come before route that displays TodoInstance (uses id).
router.get('/todoinstance/create', todo_instance_controller.todoinstance_create_get);

// POST request for creating TodoInstance.
router.post('/todoinstance/create', todo_instance_controller.todoinstance_create_post);

// GET request to delete TodoInstance.
router.get('/todoinstance/:id/delete', todo_instance_controller.todoinstance_delete_get);

// POST request to delete TodoInstance.
router.post('/todoinstance/:id/delete', todo_instance_controller.todoinstance_delete_post);

// GET request to update TodoInstance.
router.get('/todoinstance/:id/update', todo_instance_controller.todoinstance_update_get);

// POST request to update TodoInstance.
router.post('/todoinstance/:id/update', todo_instance_controller.todoinstance_update_post);

// GET request for one TodoInstance.
router.get('/todoinstance/:id', todo_instance_controller.todoinstance_detail);

// GET request for list of all TodoInstances.
router.get('/todoinstances', todo_instance_controller.todoinstance_list);

module.exports = router;
