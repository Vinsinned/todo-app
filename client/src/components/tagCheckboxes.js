import React, { useEffect, useState } from "react";

export default function Checkboxes(props) {
	const {tags, todo, updateTodo} = props;
	//Declare a list state that will contain HTML of all tags
	const [list, setList] = useState([]);
	
	//Get tags from database and map the data to create HTML
	async function allTags() {
		const tags = await fetch(`http://localhost:5000/tags`);

		if (!tags.ok) {
			const message = `An error occurred: ${tags.statusText}`;
			window.alert(message);
			return;
		}

		//Wait for tags json to finish fetch (It is asynchronous)
		const list = await tags.json();
		//Declare an array to fill with HTML
		const tagsArray = [];

		list.map((tag) => {
			tagsArray.push(
				<div className={`tag-name-container ${tag.name}`} key={tag._id} onClick={(e) => tagFormClick(e)}>
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
			)
		});
		//Set list to the tags array in order to rerender
		setList(tagsArray);
	};

	//When a tag option is clicked, toggle the check
	function tagFormClick(e) {
		document.getElementsByName(e.target.classList[1])[0].checked = !document.getElementsByName(e.target.classList[1])[0].checked;
		checkEvent(document.getElementsByName(e.target.classList[1])[0]);
	}

	function checkEvent(e) {
		if (e.checked === true) {
			//If the tag is checked, add the tag to the state
			updateTodo({ tag: [...todo.tag, e.value] });
		} else if (e.checked === false) {
			//Else, go through the array and remove the tag
			updateTodo({tag: todo.tag.filter(value => value !== e.value)})
		}
	}

	//When the tag todo button is clicked, add styling and blocker
	function tagCheckboxClick(e) {
		document.getElementsByClassName('tag-blocker')[0].classList.add('tag-blocker--show');
		document.getElementsByClassName('todo-sell-button')[0].classList.add('todo-sell-button--clicked');
		allTags();
	}
	
	//Add a new tag to the database if the add tag button is clicked
	async function addTag(name) {
		//Declare a variable with the name and push it to the database
		const newTag = name;

		await fetch("http://localhost:5000/tags/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTag),
		})
		.catch(error => {
			window.alert(error);
			return;
		});

		//Wait until fetch gets the tag revently added
		const tags = await fetch(`http://localhost:5000/tags/search?${new URLSearchParams({name: newTag.name})}`);

		if (!tags.ok) {
			const message = `An error occurred: ${tags.statusText}`;
			window.alert(message);
			return;
		}

		//Update the list state with the new results
		const list = await tags.json();
		const tagsArray = [];

		list.map((tag) => {
			tagsArray.push(
				<div className={`tag-name-container ${tag.name}`} key={tag._id} onClick={(e) => tagFormClick(e)}>
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
			)
		});

		setList(tagsArray);

	}

	//When the tag input is changed, update the list state with the results
	async function tagInputChange(e) {
		const name = e.target.value;
		const tags = await fetch(`http://localhost:5000/tags/search?${new URLSearchParams({name: name})}`);

		if (!tags.ok) {
			const message = `An error occurred: ${tags.statusText}`;
			window.alert(message);
			return;
		}

		const list = await tags.json();
		const tagsArray = [];

		if (e.target.value.length === 0) {
			allTags();
		} else if (list.length === 0) {
			tagsArray.push(
				<div className="tag-not-found" key={"not-found"}>
					<span className="add-tag-text">Tag not found</span>
				</div>,
				<div className="add-tag" key={"add-tag"} onClick={() => addTag({name})}>
					<span className="material-symbols-outlined">
						add
					</span>
					<span className="add-tag-text">
						Create "{name}"
					</span>
				</div>
			)
		}

		list.map((tag) => {
			tagsArray.push(
				<div className={`tag-name-container ${tag.name}`} key={tag._id} onClick={(e) => tagFormClick(e)}>
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
			)
		});

		setList(tagsArray);
	}

	return (
		<div className="tag-button">
			<span className="material-symbols-outlined todo-sell-button" onClick={(e) => tagCheckboxClick(e)}>
				sell
			</span>
			<div className="tag-blocker">
			<div className="form-group tag-form">
				<input type="search" className="tag-search" placeholder="Search Tags" onChange={(e) => tagInputChange(e)} />
				<div className="tag-list-div">
				{list}
				</div>
			</div>
			</div>
		</div>
	)
}