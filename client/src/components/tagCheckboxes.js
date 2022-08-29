import React from "react";

export default function Checkboxes(props) {
	const {tags, todo, updateTodo} = props;

	function checkEvent(e) {
		if (e.checked === true) {
			updateTodo({ tag: [...todo.tag, e.value] });
		} else if (e.checked === false) {
			updateTodo({tag: todo.tag.filter(value => value !== e.value)})
		}
	}

	function tagCheckboxClick(e) {
		document.getElementsByClassName('tag-blocker')[0].classList.add('tag-blocker--show');
		document.getElementsByClassName('todo-sell-button')[0].classList.add('todo-sell-button--clicked');
	}

	function tagFormClick(e) {
		document.getElementsByName(e.target.classList[1])[0].checked = !document.getElementsByName(e.target.classList[1])[0].checked;
		checkEvent(document.getElementsByName(e.target.classList[1])[0]);
	}

	return (
		<div className="tag-button">
			<span className="material-symbols-outlined todo-sell-button" onClick={(e) => tagCheckboxClick(e)}>
				sell
			</span>
			<div className="tag-blocker">
			<div className="form-group tag-form">
				<input type="search" className="tag-search" placeholder="Search Tags" />
				{tags.map((tag) => {
					return <div className={`tag-name-container ${tag.name}`} key={tag._id} onClick={(e) => tagFormClick(e)}>
						<div className="tag-flex-left">
							<svg style={{ width: "1.1rem", height: "1.1rem" }} viewBox="0 0 24 24" className="checkbox-sell-symbol">
								<path fill="#808080" d="M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.58,21.41C11.95,21.77 12.45,22 13,22C13.55,22 14.05,21.77 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.44 21.77,11.94 21.41,11.58Z" />
							</svg>
							<label htmlFor={tag.name} className="form-check-label tag-name-label">{tag.name}</label>
						</div>
						<label className="tag-checkbox-container">
							<input type="checkbox" 
								className="input-checkbox-button"
								value={tag.name} 
								onChange={(e) => 
									checkEvent(e)
								}
								name={tag.name}
								id={tag._id}
								checked={todo.tag.includes(tag.name)}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				})}
			</div>
			</div>
		</div>
	)
}