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
    tag: [],
    status: "Unfinished",
    priority: "None",
    date: null,
		time: null
  });
	//create date and time in arrays to be able to add and delete as needed
	const [dateButton, setDateButton] = useState([
		<button key="dateButton" id="dateButton" type="button" onClick={(e) => dateClicked(e)} className="dateAdd">Add Date</button>
	]);
	const [timeButton, setTimeButton] = useState([]);
	const [date, setDate] = useState([]);
	const [time, setTime] = useState([]);
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

	//put all of this code into another component later
	function addDate() {
		setDate([
			<div className="form-group" key="dateInput">
				<input 
					type="date" 
					id="dateInput" 
					name="date"
					onChange={(e) => updateTodo({ date: e.target.value })}
					min={new Date().toISOString().substring(0,10)}
					value={new Date().toISOString().substring(0,10)}
				/>
			</div>
		]);
	}

	function removeDate() {
		setDate([]);
	}

	function addTime() {
		setTime([
			<div className="form-group" key="timeInput">
				<input 
					type="time" 
					id="timeInput" 
					name="time"
					onChange={(e) => updateTodo({ time: e.target.value })}
					min={new Date().toISOString().substring(11,16)}
					value={new Date().toISOString().substring(11,16)}
				/>
			</div>
		]);
	}

	function removeTime() {
		setTime([]);
	}

	function dateClicked(e) {
		if (e.target.className === 'dateAdd') {
			addDate();
			setDateButton([
				<button key="dateButton" id="dateButton" type="button" onClick={(e) => dateClicked(e)} className="dateRemove">Remove Date</button>
			]);
			setTimeButton([
				<button type="button" key="timeButton" id="timeButton" className="timeAdd" onClick={(e) => timeClicked(e)}>Add Time</button>
			]);
		} else if (e.target.className === 'dateRemove') {
			removeDate();
			setDateButton([
				<button key="dateButton" id="dateButton" type="button" onClick={(e) => dateClicked(e)} className="dateAdd">Add Date</button>
			]);
			setTimeButton([]);
		}
	}

	function timeClicked(e) {
		if (e.target.className === 'timeAdd') {
			addTime();
			setTimeButton([
				<button type="button" key="timeButton" id="timeButton"  className="timeRemove" onClick={(e) => timeClicked(e)}>Remove Time</button>
			]);
		} else if (e.target.className === 'timeRemove') {
			removeTime();
			setTimeButton([
				<button type="button" key="timeButton" id="timeButton"  className="timeAdd" onClick={(e) => timeClicked(e)}>Add Time</button>
			]);
		}
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
    <div>
      <h3>Create New Todo</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
					<p className="errorPara">{errors.title}</p>
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
				{/*make this into a component when all others are finished*/}
				<div className="dateContainer">
					<p className="errorPara" >{errors.date}</p>
					{date}
					<p className="errorPara">{errors.time}</p>
					{time}
					<div className="form-group">
						{dateButton}
						{timeButton}
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