import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CreateTodo from "./createTodo";
import TodoComponent from "./todoComponent";

export default function Inbox(props) {
	const {categories, updateCategories} = props;
	const [todos, setTodos] = useState([]);
	const [addForm, setAddForm] = useState([]);
	//create a state that will store the class/identification of the current edit.
	//When another edit is clicked, cancel the current edit and set the new edit to the state
	//When edit is submitted successfully, set the state back to null
	const [currentEdit, setCurrentEdit] = useState([null]);
	const [todosList, setTodosList] = useState(null);
	let prevCurrentEdit = null;

	function updateCurrentEdit(id) {
		//make current edit an object with prev current and current edit
		return setCurrentEdit(id);
	}

	async function removeEdit() {
		//go through every single todo and call click so i can remove the edit
		const getTodos = await fetch('http://localhost:5000/todos');

		if (!getTodos.ok) {
			const message = `An error occured: ${getTodos.statusText}`;
			return;
		}

		const todos = await getTodos.json();
		setTodosList(todos);
	}

	useEffect(() => {
		removeEdit();
		if (todosList !== null) {
			todosList.map(todo => {
				//remove the edit state if the edit is not currently being edited
				if (document.getElementById(`${todo._id}`) && todo._id !== currentEdit) {
					document.getElementById(`${todo._id}`).click();
				};
			});
		};
	}, [currentEdit]);

	useEffect(() => {
		if (currentEdit !== 'edited') {
			return;
		}

		async function getTodos() {
			const highPriorities = await fetch(`http://localhost:5000/todos/priority?${new URLSearchParams({priority: 'high'})}`);
			const mediumPriorities = await fetch(`http://localhost:5000/todos/priority?${new URLSearchParams({priority: 'medium'})}`);
			const lowPriorities = await fetch(`http://localhost:5000/todos/priority?${new URLSearchParams({priority: 'low'})}`);
			const nonePriorities = await fetch(`http://localhost:5000/todos/priority?${new URLSearchParams({priority: 'none'})}`);

			if (!highPriorities.ok) {
				const message = `An error occurred: ${highPriorities.statusText}`;
				window.alert(message);
				return;
			} else if (!mediumPriorities.ok) {
				const message = `An error occurred: ${mediumPriorities.statusText}`;
				window.alert(message);
				return;
			} else if (!lowPriorities.ok) {
				const message = `An error occurred: ${lowPriorities.statusText}`;
				window.alert(message);
				return;
			} else if (!nonePriorities.ok) {
				const message = `An error occurred: ${nonePriorities.statusText}`;
				window.alert(message);
				return;
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

			//Update the list state with the new results
			const getHigh = await highPriorities.json();
			const getMedium = await mediumPriorities.json();
			const getLow = await lowPriorities.json();
			const getNone = await nonePriorities.json();

			const getArray = [];

			getHigh.map((todo) => {
				let categoryColor;
				const date = Date(todo.date).substring(4, 10);
				const time = new Date(todo.date).toLocaleTimeString('en-US');
				if (todo.category !== "") {
					categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
				}
				return getArray.push(
					<TodoComponent todo={todo} key={todo._id} categories={categories} updateCategories={updateCategories} currentEdit={currentEdit} updateCurrentEdit={updateCurrentEdit} />
				);
			});
			getMedium.map((todo) => {
				let categoryColor;
				const date = Date(todo.date).substring(4, 10);
				const time = new Date(todo.date).toLocaleTimeString('en-US');
				if (todo.category !== "") {
					categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
				};
				return getArray.push(
					<TodoComponent todo={todo} key={todo._id} categories={categories} updateCategories={updateCategories} currentEdit={currentEdit} updateCurrentEdit={updateCurrentEdit} />
				);
			});
			getLow.map((todo) => {
				let categoryColor;
				const date = Date(todo.date).substring(4, 10);
				const time = new Date(todo.date).toLocaleTimeString('en-US');
				if (todo.category !== "") {
					categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
				};
				return getArray.push(
					<TodoComponent todo={todo} key={todo._id} categories={categories} updateCategories={updateCategories} currentEdit={currentEdit} updateCurrentEdit={updateCurrentEdit} />
				);
			});
			getNone.map((todo) => {
				let categoryColor;
				const date = Date(todo.date).substring(4, 10);
				const time = new Date(todo.date).toLocaleTimeString('en-US');
				if (todo.category !== "") {
					categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
				};
				return getArray.push(
					<TodoComponent todo={todo} key={todo._id} categories={categories} updateCategories={updateCategories} currentEdit={currentEdit} updateCurrentEdit={updateCurrentEdit} />
				);
			});

			setTodos(getArray);
		}

		getTodos();
	}, [currentEdit]);

	//fix: cannot re-edit without refreshing after clicking "edit todo"
	// of the todos not of high priority
	useEffect(() => {
		async function getTodos() {
			const highPriorities = await fetch(`http://localhost:5000/todos/priority?${new URLSearchParams({priority: 'high'})}`);
			const mediumPriorities = await fetch(`http://localhost:5000/todos/priority?${new URLSearchParams({priority: 'medium'})}`);
			const lowPriorities = await fetch(`http://localhost:5000/todos/priority?${new URLSearchParams({priority: 'low'})}`);
			const nonePriorities = await fetch(`http://localhost:5000/todos/priority?${new URLSearchParams({priority: 'none'})}`);

			if (!highPriorities.ok) {
				const message = `An error occurred: ${highPriorities.statusText}`;
				window.alert(message);
				return;
			} else if (!mediumPriorities.ok) {
				const message = `An error occurred: ${mediumPriorities.statusText}`;
				window.alert(message);
				return;
			} else if (!lowPriorities.ok) {
				const message = `An error occurred: ${lowPriorities.statusText}`;
				window.alert(message);
				return;
			} else if (!nonePriorities.ok) {
				const message = `An error occurred: ${nonePriorities.statusText}`;
				window.alert(message);
				return;
			}

			//Update the list state with the new results
			const getHigh = await highPriorities.json();
			const getMedium = await mediumPriorities.json();
			const getLow = await lowPriorities.json();
			const getNone = await nonePriorities.json();

			const getArray = [];

			getHigh.map((todo) => {
				let categoryColor;
				if (todo.category !== "") {
					categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
				};
				return getArray.push(
					<TodoComponent todo={todo} key={todo._id} categories={categories} updateCategories={updateCategories} currentEdit={currentEdit} updateCurrentEdit={updateCurrentEdit} />
				);
			});
			getMedium.map((todo) => {
				let categoryColor;
				if (todo.category !== "") {
					categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
				};
				return getArray.push(
					<TodoComponent todo={todo} key={todo._id} categories={categories} updateCategories={updateCategories} currentEdit={currentEdit} updateCurrentEdit={updateCurrentEdit} />
				);
			});
			getLow.map((todo) => {
				let categoryColor;
				if (todo.category !== "") {
					categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
				};
				return getArray.push(
					<TodoComponent todo={todo} key={todo._id} categories={categories} updateCategories={updateCategories} currentEdit={currentEdit} updateCurrentEdit={updateCurrentEdit} />
				);
			});
			getNone.map((todo) => {
				let categoryColor;
				if (todo.category !== "") {
					categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
				};
				return getArray.push(
					<TodoComponent todo={todo} key={todo._id} categories={categories} updateCategories={updateCategories} currentEdit={currentEdit} updateCurrentEdit={updateCurrentEdit} />
				);
			});

			setTodos(getArray);
		}

		getTodos();
	}, [todos.length])

	function renderTodoForm() {
		setAddForm(<CreateTodo category={"inbox"} categories={categories} updateCategories={updateCategories} />)
	}

	return (
		<section className="inbox-section">
			<div className="inbox-header">
				<h1>Inbox</h1>
				<div className="inbox-sort">
					<span>Custom sorting</span>
					<span className="material-symbols-outlined inbox-sort__close">
						close
					</span>
				</div>
				{todos}
			</div>
			<button className="addTodo" type="button" onClick={() => renderTodoForm()}>
				<span className="material-symbols-outlined">
					add
				</span>
				<span>Add Todo</span>
			</button>
			

		</section>
	)
}