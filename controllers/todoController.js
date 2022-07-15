var Todo = require('../models/todo');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all todos.
exports.todo_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Todo list');
};

// Display detail page for a specific todo.
exports.todo_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Todo detail: ' + req.params.id);
};

// Display todo create form on GET.
exports.todo_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Todo create GET');
};

// Handle todo create on POST.
exports.todo_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Todo create POST');
};

// Display todo delete form on GET.
exports.todo_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Todo delete GET');
};

// Handle todo delete on POST.
exports.todo_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Todo delete POST');
};

// Display todo update form on GET.
exports.todo_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Todo update GET');
};

// Handle todo update on POST.
exports.todo_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Todo update POST');
};