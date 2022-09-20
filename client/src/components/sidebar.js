import React, { useState, useEffect } from "react";
import '../styles/style.css';

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

export default function Sidebar() {
	//Declare a category state to store all of the categories info
	const [categories, setCategories] = useState([]);

	//When the category length isn't the same, update it
	useEffect(() => {
		async function getCategories() {
			//create array for DOMs to be pushed
			const categoriesArray = [];

			//get count of category and return the JSON
			async function getCount(categoryName) {
				const countResponse = await fetch(`http://localhost:5000/categories/count?${new URLSearchParams({category: categoryName})}`);
				if (!countResponse.ok) {
					const message = `An error has occurred: ${countResponse.statusText}`;
					window.alert(message);
					return;
				}
				
				const count = await countResponse.json();
				if (!count) {
					const message = `An error has occurred`;
					window.alert(message);
					return;
				}

				return count;
			}

			//get all categories from mongoDB
			const response = await fetch(`http://localhost:5000/categories/`);
			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}
			
			//wait until JSON is fetched
			const getCategories = await response.json();
			//create object dictionary for getting category count
			const categoryCountArray = {};
			
			//iterate over each item in categories and append to categoriesArray as an element
			const iterateCategories = async (categories) => {
				for (const category of categories) {
					await getCount(category.name).then((result) => {
						categoriesArray.push(
							<li className="sidebar-category" key={category._id}>
								<div className="sidebar-category__category-info">
									<span className="sidebar-category__color" style={{backgroundColor: category.color.colorHex}}/>
									{category.name}
									{result['count']}
								</div>
							</li>
						)
					})
				}
				return categoriesArray;
			};

			//call iterateCategories, and when it finishes (then function), set the categories
			//This is done in order to make sure that the promise returns the value, not the promise itself as it is asynchronous
			iterateCategories(getCategories).then(() => {
				setCategories(categoriesArray);
			});
		}

		getCategories();
	
		return;
	}, [categories.length]);

	//Show or hide the categories when the toggle div is clicked
	function categoriesToggle() {
		document.getElementsByClassName('categories__expand')[0].classList.toggle('categories--hide');
		document.getElementsByClassName('categories__collapse')[0].classList.toggle('categories--hide')
	}

	function addCategory(e) {

	}
	return (
		<nav className="sidebar">
			<ul>
				<li>
					<NavLink to="/" style={{textDecoration: 'none'}} className="sidebar__link">
						<div className="inbox">
							<span className="material-symbols-outlined">
								inbox
							</span>
							Inbox
						</div>
					</NavLink>
				</li>
				<li>
					<NavLink to="/" style={{textDecoration: 'none'}} className="sidebar__link">
						<div className="today">
							<span className="material-symbols-outlined">
								today
							</span>
							Today
						</div>
					</NavLink>
				</li>
				<li>
					<NavLink to="/" style={{textDecoration: 'none'}} className="sidebar__link">
						<div className="upcoming">
							<span className="material-symbols-outlined">
								calendar_month
							</span>
							Upcoming
						</div>
					</NavLink>
				</li>
				<li>
					<NavLink to="/" style={{textDecoration: 'none'}} className="sidebar__link">
						<div className="tasks">
							<span className="material-symbols-outlined">
								list
							</span>
							Tasks
						</div>
					</NavLink>
				</li>
				<li>
					<NavLink to="/" style={{textDecoration: 'none'}} className="sidebar__link">
						<div className="filter">
							<span className="material-symbols-outlined">
								filter_list
							</span>
							Filters
						</div>
					</NavLink>
				</li>
				<li className="categories-container">
					<div className="categories">
						<div className="categories__right" onClick={() => {categoriesToggle()}}>
							<span className="material-symbols-outlined categories__expand">
								expand_more
							</span>
							<span className="material-symbols-outlined categories__collapse categories--hide">
								chevron_right
							</span>
							<h4 className="categories__heading">Categories</h4>
						</div>
						<span className="material-symbols-outlined categories__add" onClick={(e) => addCategory}>
							add
						</span>
					</div>
				</li>
				{categories}
			</ul>
		</nav>
	);
}