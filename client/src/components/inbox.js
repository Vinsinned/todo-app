import React, { useEffect, useState } from "react";
import { createPath } from "react-router-dom";
import CreateTodo from "./createTodo";

export default function Inbox() {
	const [todos, setTodos] = useState([]);
	const [addForm, setAddForm] = useState([]);

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

			function checkmarkClick(e) {
				if (document.getElementsByClassName(`checkmark-${e.target.className}`)[0].classList.contains('unclicked')) {
					document.getElementsByClassName(`checkmark-${e.target.className}`)[0].classList.remove('unclicked');
					document.getElementsByClassName(`checkmark-${e.target.className}`)[0].classList.add('clicked');
					document.getElementsByClassName('todo-checkmark-sign')[0].classList.add('todo-checkmark-sign--checked');
				} else {
					document.getElementsByClassName(`checkmark-${e.target.className}`)[0].classList.add('unclicked');
					document.getElementsByClassName(`checkmark-${e.target.className}`)[0].classList.remove('clicked');
					document.getElementsByClassName('todo-checkmark-sign')[0].classList.remove('todo-checkmark-sign--checked');
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
				getArray.push(
					<div className="todo-item" key={todo._id}>
						<span className="material-symbols-outlined drag-todo">
							drag_indicator
						</span>
						<label className="todo-checkbox">
							<input type="checkbox" className="high" onClick={(e) => checkmarkClick(e)}/>
							<span className="checkmark unclicked checkmark-high"></span>
							<span className="material-symbols-outlined todo-checkmark-sign todo-checkmark-high">
								done
							</span>
						</label>
						<div className="todo-information">
							<div className="todo-header">
								<h2 className="todo-title">{todo.title}</h2>
								<div className="todo-options">
									<span className="material-symbols-outlined">
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
									<span className="material-symbols-outlined todo-deadline__calendar">
										event
									</span>
									<h3 className="todo-deadline__heading">
										{date} {time.substring(0, 4)} {time.substring(7, 10)}
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
				)
			});
			getMedium.map((todo) => {
				let categoryColor;
				const date = Date(todo.date).substring(4, 10);
				const time = new Date(todo.date).toLocaleTimeString('en-US');
				if (todo.category !== "") {
					categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
				}
				getArray.push(
					<div className="todo-item" key={todo._id}>
						<span className="material-symbols-outlined drag-todo">
							drag_indicator
						</span>
						<label className="todo-checkbox">
							<input type="checkbox" className="medium" onClick={(e) => checkmarkClick(e)}/>
							<span className="checkmark unclicked checkmark-medium"></span>
							<span className="material-symbols-outlined todo-checkmark-sign todo-checkmark-medium">
								done
							</span>
						</label>
						<div className="todo-information">
							<div className="todo-header">
								<h2 className="todo-title">{todo.title}</h2>
								<div className="todo-options">
									<span className="material-symbols-outlined">
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
									<span className="material-symbols-outlined todo-deadline__calendar">
										event
									</span>
									<h3 className="todo-deadline__heading">
										{date} {time.substring(0, 4)} {time.substring(7, 10)}
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
				)
			});
			getLow.map((todo) => {
				let categoryColor;
				const date = Date(todo.date).substring(4, 10);
				const time = new Date(todo.date).toLocaleTimeString('en-US');
				if (todo.category !== "") {
					categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
				}
				getArray.push(
					<div className="todo-item" key={todo._id}>
						<span className="material-symbols-outlined drag-todo">
							drag_indicator
						</span>
						<label className="todo-checkbox">
							<input type="checkbox" className="low" onClick={(e) => checkmarkClick(e)}/>
							<span className="checkmark unclicked checkmark-low"></span>
							<span className="material-symbols-outlined todo-checkmark-sign todo-checkmark-low">
								done
							</span>
						</label>
						<div className="todo-information">
							<div className="todo-header">
								<h2 className="todo-title">{todo.title}</h2>
								<div className="todo-options">
									<span className="material-symbols-outlined">
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
									<span className="material-symbols-outlined todo-deadline__calendar">
										event
									</span>
									<h3 className="todo-deadline__heading">
										{date} {time.substring(0, 4)} {time.substring(7, 10)}
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
				)
			});
			getNone.map((todo) => {
				let categoryColor;
				const date = Date(todo.date).substring(4, 10);
				const time = new Date(todo.date).toLocaleTimeString('en-US');
				if (todo.category !== "") {
					categoryColor = <span className="todo-item-category__color" style={{backgroundColor: "grey"}} />;
				}
				getArray.push(
					<div className="todo-item" key={todo._id}>
						<span className="material-symbols-outlined drag-todo">
							drag_indicator
						</span>
						<label className="todo-checkbox">
							<input type="checkbox" className="none" onClick={(e) => checkmarkClick(e)}/>
							<span className="checkmark unclicked checkmark-none"></span>
							<span className="material-symbols-outlined todo-checkmark-sign todo-checkmark-none">
								done
							</span>
						</label>
						<div className="todo-information">
							<div className="todo-header">
								<h2 className="todo-title">{todo.title}</h2>
								<div className="todo-options">
									<span className="material-symbols-outlined">
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
									<span className="material-symbols-outlined todo-deadline__calendar">
										event
									</span>
									<h3 className="todo-deadline__heading">
										{date} {time.substring(0, 4)} {time.substring(7, 10)}
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
				)
			});

			setTodos(getArray);
		}

		getTodos();

		/*
		getTodos.map((tag) => {
			todosArray.push(
				
			)
		});
		*/
	}, [todos.length])

	function renderTodoForm() {
		setAddForm(<CreateTodo />)
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
			{addForm}

		</section>
	)
}