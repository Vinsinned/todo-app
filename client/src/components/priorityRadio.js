import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";

export default function Radios(props) {
	const {priorities, todo, updateTodo} = props;
	//Declare a variable which will contain all of the priority buttons HTML
	const prioritiesList = [];
	//popper consts
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const [arrowElement, setArrowElement] = useState(null);
	const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
		placement: 'bottom',
		modifiers: [
			{ name: 'arrow', options: { element: arrowElement }}
		]
	});
	//Create a priority button state and give it the current priority svg (Filled vs Not Filled)
	//This is placed after the popper consts in order to make sure that they initialize before referenceButton (We are using ref with popper)
	const [priorityButton, setPriorityButton] = useState([
		<svg className={`priority-clickable-button`} ref={setReferenceElement} onClick={() => buttonClick()} style={{width:"24px",height:"24px"}} viewBox="0 0 24 24" key={todo.priority}>
			<path className={`flag-svg ${todo.priority}-color`} fill="currentColor" d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3M7,7.25V11.5C7,11.5 9,10 11,10C13,10 14,12 16,12C18,12 18,11 18,11V7.5C18,7.5 17,8 16,8C14,8 13,6 11,6C9,6 7,7.25 7,7.25Z" stroke="#fff" strokeWidth="1" />
		</svg>
	]);

	//When a priority option is clicked remove the focused styling
	function priorityClick(e) {
		updateTodo({priority: e.target.classList[1]});
		document.getElementsByClassName('priority-clickable-button')[0].classList.remove('priority-clickable-button--clicked');
		document.getElementsByClassName('priority-blocker')[0].classList.remove('priority-blocker--show');
	}

	//When the current todo's priority is changed, change the priority todo button accordingly
	useEffect(() => {
		if (todo.priority === 'none') {
			//If current priority is none, make it a outlined flag
			setPriorityButton([
				<svg className={`priority-clickable-button`} ref={setReferenceElement} onClick={() => buttonClick()} style={{width:"24px",height:"24px"}} viewBox="0 0 24 24" key={todo.priority}>
					<path className={`flag-svg ${todo.priority}-color`} fill="currentColor" d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3M7,7.25V11.5C7,11.5 9,10 11,10C13,10 14,12 16,12C18,12 18,11 18,11V7.5C18,7.5 17,8 16,8C14,8 13,6 11,6C9,6 7,7.25 7,7.25Z" stroke="#fff" strokeWidth="1" />
				</svg>
			]);
		} else {
			//Else, make it a filled flag with the priority's color
			setPriorityButton([
				<svg className={`priority-clickable-button`} ref={setReferenceElement} onClick={() => buttonClick()} style={{width:"24px",height:"24px"}} viewBox="0 0 24 24" key={todo.priority}>
					<path className={`flag-svg ${todo.priority}-color`} d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z" />
				</svg> 
			]);
		}
  	}, [todo.priority]);


	//Call this function immediately, which will populate the prioritiesList array
	(function mapPriorities() {
		let currentPriority = [];
		let flagSvg = [];
		priorities.map((priority) => {
			if (todo.priority === priority) {
				//If current priority is the current iterated priority, add a checkmark
				currentPriority = [
					<span className={`material-symbols-outlined priority-check ${priority}-color`} key={"check"}>
						check
					</span>
				];
			} else {
				//Else, there will be no checkmark
				currentPriority = [];
			};
			//Change priority svg depending on priority
			if (priority === 'none') {
				flagSvg = [
					<svg className="priority-svg" style={{width:"24px",height:"24px"}} viewBox="0 0 24 24" key={priority}>
						<path className={`flag-svg ${priority}-color`} fill="currentColor" d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3M7,7.25V11.5C7,11.5 9,10 11,10C13,10 14,12 16,12C18,12 18,11 18,11V7.5C18,7.5 17,8 16,8C14,8 13,6 11,6C9,6 7,7.25 7,7.25Z" stroke="#fff" strokeWidth="1" />
					</svg>
				]
			} else {
				flagSvg = [
					<svg className="priority-svg" style={{width:"24px",height:"24px"}} viewBox="0 0 24 24" key={priority}>
						<path className={`flag-svg ${priority}-color`} d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z" />
					</svg>
				]
			}
			//Push the current iterated priority's option
			prioritiesList.push(
				<li className={`priority-list-container ${priority}`} key={priority} onClick={(e) => priorityClick(e)}>
					{flagSvg}
					<span className="priority-option-text">
						{priority.charAt(0).toUpperCase() + priority.slice(1)}
					</span>
					{currentPriority}
				</li>
			)
		})
	})();

	//When the priority todo button is clicked, add the styling and page blocker
	function buttonClick() {
		document.getElementsByClassName('priority-clickable-button')[0].classList.add('priority-clickable-button--clicked');
		document.getElementsByClassName('priority-blocker')[0].classList.add('priority-blocker--show');
	};

	function buttonContainerClick() {
		update();
	}

	return (
		<div className="priority-container">
			<div className="priority-button" onClick={() => buttonContainerClick()}>
				{priorityButton}
			</div>
			<div className="priority-blocker">
				<div className="form-group priority-form" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
					<ul>
						{prioritiesList}
					</ul>
				</div>
			</div>
		</div>
	);
};