import React from "react";

export default function Checkboxes(props) {
	const {tags, todo, updateTodo} = props;
	return (
		<div className="form-group">
			{tags.map((tag) => {
				return <div className="form-check form-check-inline" key={tag._id}>
					<input
						className="form-check-input"
						type="checkbox"
						name="tag"
						id={tag.name}
						value={tag.name}
						checked={todo.tag === tag.name}
						onChange={(e) => updateTodo({ tag: e.target.value })}
					/>
					<label htmlFor="tag" className="form-check-label">{tag.name}</label>
			</div>
			})}
		</div>
	)
}