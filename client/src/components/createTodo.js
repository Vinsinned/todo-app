import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Checkboxes from "./tagCheckboxes";
import Radios from "./priorityRadio";

//add props that links to category/parent of todo
export default function CreateTodo() {
	const priorities = ["High", "Medium", "Low", "None"];
  const [tags, setTags] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    category: "",
    tag: "",
    status: "Unfinished",
    priority: "",
    date: null,
		time: null
  });
  const navigate = useNavigate();

  //Get list of all tags to use for component
  useEffect(() => {
    async function getTags() {
			const response = await fetch(`http://localhost:5000/tag/`);
	
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
  
    await fetch("http://localhost:9000/todo/create", {
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
  
    setTodo({ title: "", description: "", category: "", tag: "",
      status: "Unfinished", priority: "", date: null, time: null,});
    navigate("/");
  }
  
  // This following section will display the todo that takes the input from the user.
  return (
    <div>
      <h3>Create New Todo</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={todo.name}
            onChange={(e) => updateTodo({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={todo.description}
            onChange={(e) => updateTodo({ description: e.target.value })}
          />
        </div>
        <Checkboxes tags={tags} todo={todo} updateTodo={updateTodo} />
				<Radios priorities={priorities} todo={todo} updateTodo={updateTodo} />
				<div className="form-group">
					<input 
						type="date" 
						id="date" 
						name="date"
						value={new Date().toISOString().substring(0,10)}
						onChange={(e) => updateTodo({ date: e.target.value })}
						min={new Date().toISOString().substring(0,10)}
					/>
				</div>
				<div className="form-group">
				<input 
					type="time" 
					id="time" 
					name="time"
					value={new Date().toISOString().substring(11,16)}
					onChange={(e) => updateTodo({ time: e.target.value })}
					min={new Date().toISOString().substring(11,16)}
					/>
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