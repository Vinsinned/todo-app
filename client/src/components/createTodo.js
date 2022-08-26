import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Checkboxes from "./tagCheckboxes";
import Radios from "./priorityRadio";
import DateForm from "./datePicker";

//add props that links to category/parent of todo
export default function CreateTodo() {
	const priorities = ["High", "Medium", "Low", "None"];
  const [tags, setTags] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    category: "",
    tag: [],
    status: "Unfinished",
    priority: "None",
    date: null,
		time: null
  });
	const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //Get list of all tags to use for component
  useEffect(() => {
    async function getTags() {
			const response = await fetch(`http://localhost:5000/tags/`);
	
			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}
	
			const records = await response.json();
			setTags(records);
		}

		getTags();

		return;
  }, [tags.length]);
  
  // These methods will update the state properties.
  function updateTodo(value) {
    return setTodo((prev) => {
      return { ...prev, ...value };
    });
  }
  
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

		let validateErrors = [];
		let invalid = false;

		//make into function later
		if (todo.title.length === 0) {
			validateErrors['title'] = 'Title must not be empty!';
			invalid = true;
		};
		if (document.getElementById('dateInput')) {
			if (document.getElementById('dateButton').className === 'dateRemove') {
				if (document.getElementById('dateInput').value === "") {
					validateErrors['date'] = 'Date must not be blank or incomplete!';
					invalid = true;
				}
			} 
			if (document.getElementById('timeButton').className === 'timeRemove') {
				if (document.getElementById('timeInput').value === "") {
					validateErrors['time'] = 'Time must be filled correctly!';
					invalid = true;
				}
			}
		};
		
		setErrors(validateErrors)

		if (invalid === true) { return; }
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newTodo = { ...todo };
		console.log(newTodo);
		
    await fetch("http://localhost:5000/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setTodo({ title: "", description: "", category: "", tag: [],
      status: "Unfinished", priority: "None", date: null, time: null,});
		setErrors({});
    navigate("/");
  }
  
  // This following section will display the todo that takes the input from the user.
  return (
    <div className="tvdo-page">
      <h1 className="todo-heading">Create New Todo</h1>
      <form onSubmit={onSubmit} className="todo-form">
				<div className="text-inputs">
					<div className="form-group todo-title">
						<p className="errorPara">{errors.title}</p>
						<label htmlFor="title" />
						<input
							type="text"
							className="form-control todo-title"
							placeholder="e.g., Vinson is the greatest"
							id="title"
							value={todo.title}
							onChange={(e) => updateTodo({ title: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="description" />
						<textarea 
							id="description" 
							className="form-control todo-description"
							placeholder="Description"
							name="description"
							onChange={(e) => updateTodo({ description: e.target.value })}
						/>
					</div>
				</div>
				<div className="todo-footer">
					<DateForm todo={todo} updateTodo={updateTodo} />
					<div className="footer-buttons">
						<div className="tag-button">
							<span className="material-symbols-outlined">
								sell
							</span>
							<Checkboxes tags={tags} todo={todo} updateTodo={updateTodo} />
						</div>
						<div className="priority-button">
							<span className="material-symbols-outlined">
								flag
							</span>
							<Radios priorities={priorities} todo={todo} updateTodo={updateTodo} />
						</div>
						<div className="question-button">
							<span className="material-symbols-outlined">
								help
							</span>
						</div>
					</div>
				</div>
				<div className="form-group">
					<input
						type="submit"
						value="Add Todo"
						className="btn btn-primary"
					/>
				</div>
      </form>
    </div>
  );
}