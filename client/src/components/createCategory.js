import React, { useState } from "react";
import { useNavigate } from "react-router";
import Colors from "./colorForm";
 
export default function CreateCategory() {
	const navigate = useNavigate();
	//Create a category state that will push the data to MongoDB
	const [category, setCategory] = useState({
		name: "",
		color: {
			colorHex: "#78909C",
			colorName: "Regent Gray",
		},
		favorite: false
	});

	const colors = {
		'Burnt Sienna': '#EF5350',
		'French Rose': '#EC407A',
		'Amethyst': '#AB47BC',
		'Fuchsia Blue': '#7E57C2',
		'Indigo': '#5C6BC0',
		'Picton Blue': '#42A5F5',
		'Dodger Blue': '#29B6F6',
		'Scooter': '#26C6DA',
		'Jungle Green': '#26A69A',
		'Fern': '#66BB6A',
		'Celery': '#9CCC65',
		'Wattle': '#D4E157',
		'Gorse': '#FFEE58',
		'Sunglow': '#FFCA28',
		'Sunshade': '#FFA726',
		'Burning Orange': '#FF7043',
		'Cement': '#8D6E63',
		'Silver': '#BDBDBD',
		'Regent Gray': '#78909C',
		'Black': '#000'
	}
 
	// These methods will update the state properties.
	function updateCategory(value) {
		return setCategory((prev) => {
			return { ...prev, ...value };
		});
	}

	//When the current color button is clicked, show the color dropdown
	function colorClick() {
		document.getElementsByClassName('color-dropdown')[0].classList.toggle('color-dropdown--show');
		document.getElementsByClassName('category-form')[0].classList.toggle('category-form--height');
	}
 
 	//This function will handle the submission.
	async function onSubmit(e) {
		e.preventDefault();
		
		// When a post request is sent to the create url, we'll add a new category to the database.
		const newCategory = { ...category };
		
		await fetch("http://localhost:5000/categories/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newCategory),
		})
		.catch(error => {
			window.alert(error);
			return;
		});
	
		setCategory({ name: "", color: { colorHex: "#78909C", colorName: "Regent Gray"}, favorite: false});
		navigate("/");
	}

	//When the page blocker is active and it was clicked anywhere, remove the color dropdown
	function blockClick(e) {
		if (document.getElementsByClassName('color-dropdown')[0].classList.contains('color-dropdown--show') === true) {
			if (e.target.className.includes('current-color') === false && e.target.className.includes('color-option') === false) {
				document.getElementsByClassName('color-dropdown')[0].classList.remove('color-dropdown--show')
				document.getElementsByClassName('category-form')[0].classList.remove('category-form--height');
			}
		}
	}

	//Disable and enable togglebar depending on length whenever name input is changed
	function nameChange(e) {
		updateCategory({ name: e.target.value });
		if (e.target.value.length !== 0) {
			document.getElementsByClassName('category-footer__add')[0].disabled = false;
		} else {
			document.getElementsByClassName('category-footer__add')[0].disabled = true;
		}
	}

	//Toggles the custom toggle switch
	function toggleClick(e) {
		document.getElementsByClassName('switch-input')[0].classList.toggle('toggle-on');
		if (document.getElementsByClassName('switch-input')[0].className.includes('toggle-on')) {
			updateCategory({ favorite: true });
		} else {
			updateCategory({ favorite: false });
		}
	}
 
 // This following section will display the form that takes the input from the user.
 return (
	<div className="page-block" onClick={(e) => blockClick(e)}>
		<div className="category-container">
			<div className="category-create">
				<div className="category-header">
					<h3>Create New Category</h3>
					<span className="material-symbols-outlined">
						help
					</span>
				</div>
				<form onSubmit={onSubmit}>
					<div className="category-form">
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control form-field"
								id="name"
								value={category.name}
								onChange={(e) => nameChange(e)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="color">Color</label>
							<button type="button" className="current-color form-control form-field" value={`${category.color.colorHex} ${category.color.colorName}`}
								onClick={(e) => colorClick(e)}>
								<span className="current-color__color" style={{backgroundColor: category.color.colorHex}} />
								{category.color.colorName}
							</button>
							<Colors category={category} colors={colors} updateCategory={updateCategory} />
						</div>
						<div className="form-group toggle">
							<label className="switch">
								<input type="checkbox" className="switch-input" onClick={(e) => toggleClick(e)}/>
								<span className="slider round"></span>
							</label>
							<p className="toggle-text">Add to favorites</p>
						</div>
					</div>
					<div className="form-group category-footer">
						<button type="button" className="category-footer__cancel category-footer__button">
							Cancel
						</button>
						<button type="submit" className="category-footer__add category-footer__button" disabled onClick={(e) => onSubmit(e)}>
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
 );
}