import React, { useState, useEffect } from "react";
import '../styles/style.css';

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

const Category = (props) => (
	<li className="category">
		{props.category.name}
	</li>
 );

export default function Sidebar() {
	const [categories, setCategories] = useState([]);
	let test=[];

	useEffect(() => {
		async function getCategories() {
			const response = await fetch(`http://localhost:5000/categories/`);
	
			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}
	
			const categories = await response.json();
			setCategories(categories);
		}
	
		getCategories();
	
		return;
	}, [categories.length]);

	function categoriesToggle() {
		document.getElementsByClassName('categories__expand')[0].classList.toggle('categories--hide');
		document.getElementsByClassName('categories__collapse')[0].classList.toggle('categories--hide')
	}

	function categoryList() {
		return categories.map((category) => {
			return (
				<Category
					category={category}
					//key is not a prop, it is an actual key for React to differentiate changes
					key={category._id}
				/>
			);
		});
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
						<span className="material-symbols-outlined categories__add">
							add
						</span>
					</div>
				</li>
				{categoryList()}
			</ul>
		</nav>
	);
}