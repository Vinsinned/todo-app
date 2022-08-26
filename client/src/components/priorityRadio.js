import React from "react";

export default function Radios(props) {
	const {priorities, todo, updateTodo} = props;
	return (
		<div className="form-group priority-form">
			{priorities.map((priority) => {
				return <div className="form-check form-check-inline" key={priority}>
					<input
						className="form-check-input"
						type="radio"
						name="priority"
						id={priority}
						value={priority}
						checked={todo.priority === priority}
						onChange={(e) => updateTodo({ priority: e.target.value })}
					/>
					<label htmlFor={priority} className="form-check-label">{priority}</label>
			</div>
			})}
		</div>
	)
}