import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Todo = (props) => (
 <li key="a">
 </li>
);
 
export default function TodoList() {
 const [todos, setTodos] = useState([]);
 
 // This method fetches the todos from the database.
 useEffect(() => {
   async function getTodos() {
     const response = await fetch(`http://localhost:5000/todos/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const todoJSON = await response.json();
     setTodos(todoJSON);
   }
 
   getTodos();
 
   return;
 }, [todos.length]);
 
 // This method will delete a todo
 async function deleteTodo(id) {
   await fetch(`http://localhost:5000/todo/${id}`, {
     method: "DELETE"
   });
 
   const newTodos = todos.filter((el) => el._id !== id);
   setTodos(newTodos);
 }
 
 // This method will map out the records on the table
 function todoList() {
	return todos.map((todo) => {
		return (
			<Todo
				/*
				record={record}
				deleteRecord={() => deleteRecord(record._id)}
				key={record._id}
				*/
			/>
		);
	});
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
		<h3>Todos</h3>
		<ul className="todo-list">
    </ul>
   </div>
 );
}