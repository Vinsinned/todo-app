import React, { useEffect, useState, useRef } from "react";
import { usePopper } from "react-popper";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

export default function CategoryDropdown(props) {
	const {todo, updateTodo, updateCategories} = props;
	const [currentCategory, setCurrentCategory] = useState([]);
	//Create the initial array that will be updated and used to display categories
	const [categoriesList, setCategoriesList] = useState([
		<li className="categories-option__inbox categories-option__option" key="inbox" onClick={() => categoryClick('inbox')}>
			<span className="material-symbols-outlined current-category__inbox-icon">inbox</span>
			Inbox
			{checkCurrent('inbox')}
		</li>
	]);
	//popper consts
	const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
	const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
		placement: 'bottom',
		strategy: 'fixed',
		flip: {
			enabled: false,
		},
    modifiers: [
			{ name: 'arrow', options: { element: arrowElement } }
		],
  });

	useEffect(() => {
		async function getCategories() {
			let categoriesArray = [
				<li className="categories-option__inbox categories-option__option" key="inbox" onClick={() => categoryClick('inbox')}>
					<span className="material-symbols-outlined current-category__inbox-icon">inbox</span>
					Inbox
					{checkCurrent('inbox')}
				</li>
			];
			const fetchCategories = await fetch('http://localhost:5000/categories');
			const getCategories = await fetchCategories.json();
			getCategories.map((category) => {
				return categoriesArray.push(
					<li className="categories-option__color categories-option__option" key={category.name} onClick={() => categoryClick(category.name)} >
						<span className="categories-option__color-icon" style={{backgroundColor: category.color.colorHex}} />
						{category.name}
						{checkCurrent(category.name)}
				</li>);
			});
			setCategoriesList(categoriesArray);
		}
		async function showCurrent(category) {
			//inbox
			if (category === 'inbox') {
				return setCurrentCategory(<>
				<span className="material-symbols-outlined current-category__inbox-icon">inbox</span>
				Inbox
			</>)
			} else {
				const fetchcategory = await fetch(`http://localhost:5000/categories/search?category=${category}`);
				const getCategory = await fetchcategory.json();
				return setCurrentCategory(<>
					<span className="current-category__color-icon" style={{backgroundColor: getCategory.color.colorHex}} />
					{getCategory.name}
				</>)
			}
		}
		getCategories();
		showCurrent(todo.category);
	}, [currentCategory.length, todo.category]);

	function categoryClick(value) {
		update();
		document.getElementsByClassName('categories-option')[0].removeAttribute('data-show');
		document.getElementById('category-dropdown-search').value = '';
		updateTodo({category: value});
		const blocker = document.getElementsByClassName('categories-blocker')[0];
		blocker.classList.remove('categories-blocker--show');
		const button = document.getElementsByClassName('current-category')[0];
		button.classList.remove('current-category--clicked');
		const dropdown = document.getElementById('categories-popper');
		dropdown.removeAttribute('data-show');
		allCategories();
	}

	function checkCurrent(category) {
		if (todo.category.toLowerCase() === category.toLowerCase()) {
			return (<svg style={{width: "0.75rem", height: "0.75rem"}} viewBox="0 0 24 24" className="current-category__check-icon">
				<path fill="gray" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" stroke="gray" strokeWidth="2" />
			</svg>)
		} 
	}

	async function allCategories() {
		let categoriesArray = [
			<li className="categories-option__inbox categories-option__option" key="inbox" onClick={() => categoryClick('inbox')}>
				<span className="material-symbols-outlined current-category__inbox-icon">inbox</span>
				Inbox
				{checkCurrent('inbox')}
			</li>
		];
		const fetchCategories = await fetch('http://localhost:5000/categories');

		const getCategories = await fetchCategories.json();
		getCategories.map((category) => {
			return categoriesArray.push(
				<li className="categories-option__color categories-option__option" key={category.name} onClick={() => categoryClick(category.name)} >
					<span className="categories-option__color-icon" style={{backgroundColor: category.color.colorHex}} />
					{category.name}
					{checkCurrent(category.name)}
			</li>);
		});
		setCategoriesList(categoriesArray);
	}

	async function createCategory(value) {
		await fetch("http://localhost:5000/categories/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(value)
		})
		.catch(error => {
			window.alert(error);
			return;
		});
		
		//After creating the new category, update the page accordingly
		const fetchCategory = await fetch(`http://localhost:5000/categories/get?${new URLSearchParams({value: value.value})}`);
		if (!fetchCategory.ok) {
			const message = `An error occurred: ${fetchCategory.statusText}`;
			window.alert(message);
			return;
		}

		const getCategory = await fetchCategory.json();
		const categoriesArray = [];

		getCategory.map((category) => {
			return categoriesArray.push(
				<li className="categories-option__color categories-option__option" key={category.name} onClick={() => updateTodo({category: category.name})} >
					<span className="categories-option__color-icon" style={{backgroundColor: category.color.colorHex}} />
					{category.name}
					{checkCurrent(category.name)}
			</li>);
		});
		setCategoriesList(categoriesArray);
		//Update the current category button
		updateCurrent(value.value);

		//update categories so that the useEffect in sidebar.js will activate and update the categories list
		const fetchCategories = await fetch(`http://localhost:5000/categories`);
		if (!fetchCategories.ok) {
			const message = `An error occurred: ${fetchCategories.statusText}`;
			window.alert(message);
			return;
		}

		const getCategories = await fetchCategories.json();
		const sidebarList = [];

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

		const iterateCategories = async (categories) => {
			for (const category of categories) {
				await getCount(category.name).then((result) => {
					sidebarList.push(
						<li className={`sidebar-category category-info `} key={category._id}>
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
			return sidebarList;
		};
		iterateCategories(getCategories).then(() => {
			updateCategories(sidebarList);
		});
	};

	//Update the current todo
	async function updateCurrent(value) {
		if (value === 'inbox') {
			return setCurrentCategory(<>
			<span className="material-symbols-outlined current-category__inbox-icon">inbox</span>
			Inbox
		</>)
		} else {
			const fetchcategory = await fetch(`http://localhost:5000/categories/search?category=${value}`);
			const getCategory = await fetchcategory.json();
			return setCurrentCategory(<>
				<span className="current-category__color-icon" style={{backgroundColor: getCategory.color.colorHex}} />
				{getCategory.name}
			</>)
		}
	}

	async function optionInputChange(value) {
		const fetchCategories = await fetch(`http://localhost:5000/categories/get?${new URLSearchParams({value: value})}`);
		if (!fetchCategories.ok) {
			const message = `An error occurred: ${fetchCategories.statusText}`;
			window.alert(message);
			return;
		};

		const getCategories = await fetchCategories.json();
		const categoriesArray = [];

		if (value.length === 0) {
			allCategories();
		} else if (getCategories.length === 0) {
			categoriesArray.push(
				<div className="category-missing-container" key={"category-missing-container"}>
					<div className="category-not-found" key={"not-found"}>
						<span className="add-category-text">Category not found</span>
					</div>
					<div className="add-category" key={"add-category"} onClick={() => createCategory({value})}>
						<span className="material-symbols-outlined">
							add
						</span>
						<span className="add-category-text">
							Create "{value}"
						</span>
					</div>
				</div>
			);
			setCategoriesList(categoriesArray);
			return;
		};

		getCategories.map((category) => {
			return categoriesArray.push(
				<li className="categories-option__color categories-option__option" key={category.name} onClick={() => categoryClick(category.name)} >
					<span className="categories-option__color-icon" style={{backgroundColor: category.color.colorHex}} />
					{category.name}
					{checkCurrent(category.name)}
			</li>);
		});
		setCategoriesList(categoriesArray);
	};

	function currentCategoryClick() {
		update();
		const blocker = document.getElementsByClassName('categories-blocker')[0];
		if (blocker.classList.contains('categories-blocker--show')) {
			blocker.classList.remove('categories-blocker--show');
		} else {
			blocker.classList.add('categories-blocker--show');
		}
		const button = document.getElementsByClassName('current-category')[0];
		if (button.classList.contains('current-category--clicked')) {
			button.classList.remove('current-category--clicked');
		} else {
			button.classList.add('current-category--clicked');
		}
		const dropdown = document.getElementById('categories-popper');
		if (dropdown.hasAttribute('data-show') === false) {
			dropdown.setAttribute('data-show', '');
		} else {
			dropdown.removeAttribute('data-show');
		}
	}

	//move this function into UseEffect!
	return (
		<div className="categories-dropdown">
			<button type="button" className="current-category todo-modifiers-button" ref={setReferenceElement} onClick={(e) => currentCategoryClick(e)}>
				{currentCategory}
			</button>
			<div className="categories-blocker page-blocker" >
				<div className="categories-option" ref={setPopperElement} style={styles.popper} {...attributes.popper} id="categories-popper">
					<div className="categories-option__search">
						<input type="text" placeholder="Search for a category" autoComplete="off"spellCheck="false" id="category-dropdown-search" onChange={(e) => optionInputChange(e.target.value)}/>
					</div>
					<ul className="categories-option__list">
						{categoriesList}
					</ul>
				</div>
			</div>
		</div>	
	)
}