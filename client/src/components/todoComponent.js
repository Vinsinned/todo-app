import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import TodoItem from "./todoItem";
import EditTodo from "./editTodo";
 
export default function TodoComponent(props) {
  const { todo, categories, updateCategories, currentEdit, updateCurrentEdit } = props;
  const [edit, setEdit] = useState(false);
  function updateEdit() {
    //if currentEdit is not null find current edit and make it false
    return setEdit((prevEdit) => !prevEdit);
  }
  
  return (
    <div className="todo-container">
      {(!edit) ? <TodoItem todo={todo} updateEdit={updateEdit} currentEdit={currentEdit} updateCurrentEdit={updateCurrentEdit} /> : <EditTodo todoInfo={todo} categories={categories} updateCategories={updateCategories} edit={edit} updateEdit={updateEdit} currentEdit={currentEdit} updateCurrentEdit={updateCurrentEdit} />}
    </div>
  );
}