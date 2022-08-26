import React from "react";

export default function Checkboxes(props) {
	const {tags, todo, updateTodo} = props;
	function checkEvent(e) {
		if (e.target.checked === true) {
			updateTodo({ tag: [...todo.tag, e.target.value] });
		} else if (e.target.checked === false) {
			updateTodo({tag: todo.tag.filter(value => value !== e.target.value)})
		}
	}
	return (
		<div className="form-group tag-form">
			{tags.map((tag) => {
				return <div className="form-check form-check-inline" key={tag._id}>
					<input
						className="form-check-input"
						type="checkbox"
						name="tag"
						id={tag._id}
						value={tag.name}
						checked={todo.tag.includes(tag.name)}
						onChange={(e) => 
							checkEvent(e)
						}
					/>
					<label htmlFor={tag.name} className="form-check-label">{tag.name}</label>
			</div>
			})}
		</div>
	)
}