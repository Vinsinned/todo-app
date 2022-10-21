import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Checkboxes from "./tagCheckboxes";
import Radios from "./priorityRadio";
import DateForm from "./datePicker";

//add props that links to category/parent of todo
export default function CreateTodo(props) {
	const navigate = useNavigate();
	//Create an array of priorities to be generated into HTML
	const priorities = ["high", "medium", "low", "none"];
	//Create a tags state in order to be able to get all tags from database and rerender
  const [tags, setTags] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    category: "",
    tag: [],
    status: "Unfinished",
    priority: "none",
    date: null,
		time: null
  });

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
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newTodo = { ...todo };
		console.log(newTodo);
		
    await fetch("http://localhost:5000/todos/add", {
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
      status: "Unfinished", priority: "none", date: null, time: null,});
    navigate("/");
  }

	//When the title input is changed, check length to see if the add todo button needs to be disabled
	function updateTitle(e) {
		updateTodo({ title: e.target.value });
		if (e.target.value.length === 0) {
			document.getElementsByClassName('add-todo')[0].disabled = true;
		} else {
			document.getElementsByClassName('add-todo')[0].disabled = false;
		}
	}
  
  // This following section will display the todo that takes the input from the user.
  return (
    <div className="tvdo-page">
      <h1 className="todo-heading">Create New Todo</h1>
      <form onSubmit={onSubmit} className="todo-form">
				<div className="main-todo-form">
					<div className="text-inputs">
						<div className="form-group todo-title">
							<label htmlFor="title" />
							<input
								type="text"
								className="form-control todo-title"
								placeholder="e.g., Vinson is the greatest"
								id="title"
								value={todo.title}
								onChange={(e) => updateTitle(e)}
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
						<p>THIS IS FOR CATEGORY DROPBOX</p>
						<div className="footer-buttons">
							<Checkboxes tags={tags} todo={todo} updateTodo={updateTodo} />
							<Radios priorities={priorities} todo={todo} updateTodo={updateTodo} />
							<div className="question-button">
								<span className="material-symbols-outlined">
									help
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-todo-form">
						<button type="button" className="cancel-todo footer-todo-button">
							Cancel
						</button>
						<button type="submit" className="add-todo footer-todo-button" disabled onClick={(e) => onSubmit(e)}>
							Add Todo
						</button>
				</div>
      </form>
    </div>
  );
}