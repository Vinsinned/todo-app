import React, { useEffect, useState } from "react";

export default function Radios(props) {
	const {priorities, todo, updateTodo} = props;
	const [priorityButton, setPriorityButton] = useState([
		<svg className={`priority-clickable-button`} onClick={() => buttonClick()} style={{width:"24px",height:"24px"}} viewBox="0 0 24 24" key={todo.priority}>
			<path className={`flag-svg ${todo.priority}-color`} fill="currentColor" d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3M7,7.25V11.5C7,11.5 9,10 11,10C13,10 14,12 16,12C18,12 18,11 18,11V7.5C18,7.5 17,8 16,8C14,8 13,6 11,6C9,6 7,7.25 7,7.25Z" stroke="#fff" strokeWidth="1" />
		</svg>
	]);
	const prioritiesList = [];

	function priorityClick(e) {
		updateTodo({priority: e.target.classList[1]});
		document.getElementsByClassName('priority-clickable-button')[0].classList.remove('priority-clickable-button--clicked');
		document.getElementsByClassName('priority-blocker')[0].classList.remove('priority-blocker--show');
	}

	useEffect(() => {
		if (todo.priority === 'none') {
			setPriorityButton([
				<svg className={`priority-clickable-button`} onClick={() => buttonClick()} style={{width:"24px",height:"24px"}} viewBox="0 0 24 24" key={todo.priority}>
					<path className={`flag-svg ${todo.priority}-color`} fill="currentColor" d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3M7,7.25V11.5C7,11.5 9,10 11,10C13,10 14,12 16,12C18,12 18,11 18,11V7.5C18,7.5 17,8 16,8C14,8 13,6 11,6C9,6 7,7.25 7,7.25Z" stroke="#fff" strokeWidth="1" />
				</svg>
			]);
		} else {
			setPriorityButton([
				<svg className={`priority-clickable-button`} onClick={() => buttonClick()} style={{width:"24px",height:"24px"}} viewBox="0 0 24 24" key={todo.priority}>
					<path className={`flag-svg ${todo.priority}-color`} d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z" />
				</svg> 
			]);
		}
  }, [todo.priority]);

	(function mapPriorities() {
		let currentPriority = [];
		let flagSvg = [];
		priorities.map((priority) => {
			if (todo.priority === priority) {
				currentPriority = [
					<span className={`material-symbols-outlined priority-check ${priority}-color`} key={"check"}>
						check
					</span>
				];
			} else {
				currentPriority = [];
			};
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

	function buttonClick() {
		document.getElementsByClassName('priority-clickable-button')[0].classList.add('priority-clickable-button--clicked');
		document.getElementsByClassName('priority-blocker')[0].classList.add('priority-blocker--show');
	}

	return (
		<div className="priority-button">
			{priorityButton}
			<div className="priority-blocker">
				<div className="form-group priority-form">
					<ul>
						{prioritiesList}
					</ul>
				</div>
			</div>
		</div>
	)
}