import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import TodoItem from "./todoItem";
import EditTodo from "./editTodo";
 
export default function TodoComponent(props) {
  const { todo, categories, updateCategories } = props;
  const [edit, setEdit] = useState(false);
  function updateEdit() {
    return setEdit((prevEdit) => !prevEdit)
  }
  /*
  async function editTodo(id) {
    console.log(id);
    const todo = await fetch(`http://localhost:5000/todos/${id}`);

    if (!todo.ok) {
      const message = `There was an error when getting todo: ${todo.statusText}`;
      window.alert(todo);
      Navigate("/");
      return;
    }
    
    const getTodo = await todo.json();
    console.log(getTodo);
  }
  */
 const [test, setTest] = useState(todo);
 //I know what to do, take todo state and use it as the todo in editTodo
  return (
    <div className="todo-container">
      {(!edit) ? <TodoItem todo={todo} updateEdit={updateEdit} /> : <EditTodo todoInfo={todo} categories={categories} updateCategories={updateCategories} />}
    </div>
  );
}