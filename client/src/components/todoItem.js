import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
 
export default function TodoItem(props) {
  const { todo, updateEdit, currentEdit, updateCurrentEdit } = props;
  let categoryColor;
  let date = null;
  let time = null;;
  //Get date and time if todo contains it
  if (todo.date !== null) {
    date =  new Date(todo.date).toString().substring(3, 10);
  }
  if (todo.time !== null) {
    //get the time from todo and convert it into hour and time format
    time = time = new Date(todo.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  }
  if (todo.category !== "") {
    categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
  }
  function checkmarkClick(e) {
    if (e.target.nextElementSibling.classList.contains('unclicked')) {
      e.target.nextElementSibling.classList.remove('unclicked');
      e.target.nextElementSibling.classList.add('clicked');
      e.target.parentNode.childNodes[2].classList.add('todo-checkmark-sign--checked');
    } else {
      e.target.nextElementSibling.classList.add('unclicked');
      e.target.nextElementSibling.classList.remove('clicked');
      e.target.parentNode.childNodes[1].classList.remove('todo-checkmark-sign--checked');
    }
  }
  function editTodo(id) {
    updateCurrentEdit(id);
    updateEdit();
  }
  return (
    <div className="todo-item">
      <span className="material-symbols-outlined drag-todo">
        drag_indicator
      </span>
      <label className="todo-checkbox">
        <input type="checkbox" className={`${todo.priority}`} onClick={(e) => checkmarkClick(e)}/>
        <span className={`checkmark unclicked checkmark-${todo.priority}`}></span>
        <span className={`material-symbols-outlined todo-checkmark-sign todo-checkmark-${todo.priority}`}>
          done
        </span>
      </label>
      <div className="todo-information">
        <div className="todo-header">
          <h2 className="todo-title">{todo.title}</h2>
          <div className="todo-options">
            <span className="material-symbols-outlined" onClick={() => {editTodo(todo._id)}}>
              edit_note
            </span>
            <span className="material-symbols-outlined">
              event
            </span>
            <span className="material-symbols-outlined">
              chat_bubble
            </span>
          </div>
          <div className="todo-more">
            <span className="material-symbols-outlined">
              more_horiz
            </span>
          </div>
        </div>
        <div className="todo-information-footer">
          <div className="todo-deadline">
            {date !== null &&
              <span className="material-symbols-outlined todo-deadline__calendar">
                event
              </span>
            }
            <h3 className="todo-deadline__heading">
              {date} {time}
            </h3>
          </div>
          <div className="todo-item-category">
            <h3 className="todo-item-category__name">
              {todo.category}
            </h3>
            {categoryColor}
          </div>
        </div>
      </div>
    </div>
  );
}