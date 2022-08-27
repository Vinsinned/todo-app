import React, { useState } from "react";
import DatePicker from "react-datepicker";
import ResponsiveTimePicker from "./timePicker";
import '../styles/style.css';

export default function DateForm(props) {
const { todo, updateTodo } = props;

const [startDate, setStartDate] = useState(new Date());
const [dateButton, setDateButton] = useState([
	<button key="dateButton" id="dateButton" type="button" onClick={(e) => dateClicked(e)} className="dateAdd date-button"><span className="material-symbols-outlined">event</span>Add Date</button>
]);
const [timeButton, setTimeButton] = useState([]);

function datePickerClick(date) {
	setStartDate(date);
	updateTodo({ date: date });
}

function addDate() {
	document.getElementsByClassName('react-datepicker__input-container')[0].classList.add('date-show');
}

function removeDate() {
	document.getElementsByClassName('react-datepicker__input-container')[0].classList.remove('date-show');
}

function addTime() {
	document.getElementsByClassName('css-1u3bzj6-MuiFormControl-root-MuiTextField-root')[0].classList.add('time-show');
}

function removeTime() {
	document.getElementsByClassName('css-1u3bzj6-MuiFormControl-root-MuiTextField-root')[0].classList.remove('time-show');
}

function dateClicked(e) {
	if (e.target.className.includes('dateAdd')) {
		addDate();
		setDateButton([
			<button key="dateButton" id="dateButton" type="button" onClick={(e) => dateClicked(e)} className="dateRemove date-button"><span className="material-symbols-outlined">event</span>Remove Date</button>
		]);
		setTimeButton([
			<button type="button" key="timeButton" id="timeButton" className="timeAdd date-button" onClick={(e) => timeClicked(e)}><span className="material-symbols-outlined">timer </span>Add Time</button>
		]);
		updateTodo({ date: new Date() });
	} else if (e.target.className.includes('dateRemove')) {
		removeDate();
		setDateButton([
			<button key="dateButton" id="dateButton" type="button" onClick={(e) => dateClicked(e)} className="dateAdd date-button"><span className="material-symbols-outlined">event</span>Add Date</button>
		]);
		setTimeButton([]);
		document.getElementsByClassName('css-1u3bzj6-MuiFormControl-root-MuiTextField-root')[0].classList.remove('time-show');
		updateTodo({ date: null });
	}
}

function timeClicked(e) {
	if (e.target.className.includes('timeAdd')) {
		addTime();
		setTimeButton([
			<button type="button" key="timeButton" id="timeButton" className="timeRemove date-button" onClick={(e) => timeClicked(e)}><span className="material-symbols-outlined">timer </span>Remove Time</button>
		]);
		updateTodo({ time: new Date() });
	} else if (e.target.className.includes('timeRemove')) {
		removeTime();
		setTimeButton([
			<button type="button" key="timeButton" id="timeButton" className="timeAdd date-button" onClick={(e) => timeClicked(e)}><span className="material-symbols-outlined">timer </span>Add Time</button>
		]);
		updateTodo({ time: null });
	}
}

return (
	<div className="dateContainer">
		<div className="form-group date-group">
			<DatePicker selected={startDate} onChange={(date) => datePickerClick(date)} key="date" className="date-picker" />
			{dateButton}
			{timeButton}
			<ResponsiveTimePicker todo={todo} updateTodo={updateTodo} />
		</div>
	</div>    
)
}