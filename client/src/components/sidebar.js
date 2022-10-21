import React, { useState, useEffect } from "react";
import '../styles/style.css';

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

export default function Sidebar() {
	//Declare a category state to store all of the categories info
	const [categories, setCategories] = useState([]);
	const [currentTab, setCurrentTab] = useState('inbox');

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
			
			//iterate over each item in categories and append to categoriesArray as an element
			const iterateCategories = async (categories) => {
				for (const category of categories) {
					let setCurrent = "";
					if (category.name === currentTab) {
						setCurrent = "current-tab"
					}
					await getCount(category.name).then((result) => {
						categoriesArray.push(
							<li className={`sidebar-category category-info ${setCurrent}`} key={category._id}>
								<NavLink to={`/category?name=${category.name}`} style={{textDecoration: 'none'}} className={`${category.name} sidebar__link__category-info sidebar__nav-link`}>
									<span className="category-info__color" style={{backgroundColor: category.color.colorHex}}/>
									<span className="category-info__title">{category.name}</span>
								</NavLink>
								<span className="category-info__count">{result['count']}</span>
								<span className="material-symbols-outlined category-info__more">
									more_horiz
								</span>
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
	}, [categories.length, currentTab]);

	//Show or hide the categories when the toggle div is clicked
	function categoriesToggle() {
		document.getElementsByClassName('categories__expand')[0].classList.toggle('categories--hide');
		document.getElementsByClassName('categories__collapse')[0].classList.toggle('categories--hide')
	}

	function addCategory(e) {

	}
		
	function checkCurrent(name) {
		if (currentTab === name) {
			return 'current-tab'
		}
	}

	const listClick = (e) => {
		if (e.target.parentNode.classList.contains('sidebar__nav-link') || e.target.classList.contains('sidebar__nav-link')) {
			setCurrentTab(e.target.classList[0]);
		}
	}

	return (
		<nav className="sidebar">
			<ul onClick={(e) => listClick(e)}>
				<li className={`main-tabs ${checkCurrent('inbox')}`}>
					<NavLink to="/" style={{textDecoration: 'none'}} className="inbox sidebar__link sidebar__nav-link">
						<div className="inbox">
							<span className="material-symbols-outlined">
								inbox
							</span>
							Inbox
						</div>
					</NavLink>
				</li>
				<li className={`main-tabs ${checkCurrent('today')}`}>
					<NavLink to="/" style={{textDecoration: 'none'}} className="today sidebar__link sidebar__nav-link">
						<div className="today">
							<span className="material-symbols-outlined">
								today
							</span>
							Today
						</div>
					</NavLink>
				</li>
				<li className={`main-tabs ${checkCurrent('upcoming')}`}>
					<NavLink to="/" style={{textDecoration: 'none'}} className="upcoming sidebar__link sidebar__nav-link">
						<div className="upcoming">
							<span className="material-symbols-outlined">
								calendar_month
							</span>
							Upcoming
						</div>
					</NavLink>
				</li>
				<li className={`main-tabs ${checkCurrent('tasks')}`}>
					<NavLink to="/" style={{textDecoration: 'none'}} className="tasks sidebar__link sidebar__nav-link">
						<div className="tasks">
							<span className="material-symbols-outlined">
								list
							</span>
							Tasks
						</div>
					</NavLink>
				</li>
				<li className={`main-tabs ${checkCurrent('filter')}`}>
					<NavLink to="/" style={{textDecoration: 'none'}} className="filter sidebar__link sidebar__nav-link">
						<div className="filter">
							<span className="material-symbols-outlined">
								filter_list
							</span>
							Filters
						</div>
					</NavLink>
				</li>
				<li className="categories-container categories-button">
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