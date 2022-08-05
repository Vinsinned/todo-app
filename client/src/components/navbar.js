import React from "react";
import '../styles/style.css'
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
	function searchClose() {
		document.getElementsByClassName('search-close')[0].classList.remove('show-close');
		document.getElementsByClassName('search-container')[0].classList.remove('search-active');
		document.getElementsByClassName('search-container__navbar-search')[0].classList.remove('search-active');
		document.getElementsByClassName('search-container__search-icon')[0].classList.remove('search-active');
	}
	return (
		<section className="navbar">
			<nav>
					<div className="left-nav">
						<span className="material-symbols-outlined">
							menu
						</span>
						<NavLink to="/" style={{textDecoration: 'none'}}>
							<h3 className="left-nav__title">Tvdo</h3>
						</NavLink>
					</div>
					<div className="search-container">
						<button type="button" className="search-container__search-icon">
							<span className="material-symbols-outlined search-container__search-icon">
								search
							</span>
						</button>
						<input type="search" className="search-container__navbar-search" name="searchBar" />
						{/*Named search-close in order to bypass includes in app.js function*/}
						<span className="material-symbols-outlined search-close" onClick={() => searchClose()}>
							close
						</span>
					</div>
					<div className="right-nav">
						<span className="material-symbols-outlined">
							add
						</span>
						<span className="material-symbols-outlined">
							help
						</span>
						<span className="material-symbols-outlined">
							notifications
						</span>
						<div className="profile">
							<img className="profile__image" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" />
						</div>
					</div>
				</nav>
		</section>
	);
}