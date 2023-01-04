import React, { useState } from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
//import TodoList from "./components/todos";
//import CreateTodo from "./components/createTodo";
//import CreateCategory from "./components/createCategory";
import Inbox from "./components/inbox";
 
const App = () => {
  const [categories, setCategories] = useState([]);

  function updateCategories(value) {
    return setCategories(() => {
      return value;
    });
  };
  function mouseClick(e) {
    if (document.getElementsByClassName('categories-option')[0] || document.getElementsByClassName('categories-option')[0]) {
      if (e.target.parentElement.classList.contains('categories-option__search') === false && e.target.parentElement.classList.contains('categories-option__list') === false &&
        e.target.parentElement.classList.contains('categories-option__color') === false && e.target.parentElement.classList.contains('categories-option__option') === false &&
        e.target.classList.contains('current-category') === false && e.target.classList.contains('current-category__color-icon') === false) {
        const blocker = document.getElementsByClassName('categories-blocker')[0];
        blocker.classList.remove('categories-blocker--show');
        const button = document.getElementsByClassName('current-category')[0];
        button.classList.remove('current-category--clicked');
        const dropdown = document.getElementById('categories-popper');
        dropdown.removeAttribute('data-show');
      };
    }
    if (document.getElementsByClassName('search-container')[0] || document.getElementsByClassName('search-container__search-icon')[0]) {
      if (e.target.classList.contains('search-container') || e.target.classList.contains('search-container__search-icon') ||
        e.target.classList.contains('search-container__navbar-search')) {
        document.getElementsByClassName('search-close')[0].classList.add('show-close');
        document.getElementsByClassName('search-container')[0].classList.add('search-active');
        document.getElementsByClassName('search-container__navbar-search')[0].classList.add('search-active');
        document.getElementsByClassName('search-container__navbar-search')[0].focus();
        document.getElementsByClassName('search-container__search-icon')[0].classList.add('search-active');
      } else {
        document.getElementsByClassName('search-close')[0].classList.remove('show-close');
        document.getElementsByClassName('search-container')[0].classList.remove('search-active');
        document.getElementsByClassName('search-container__navbar-search')[0].classList.remove('search-active');
        document.getElementsByClassName('search-container__search-icon')[0].classList.remove('search-active');
      }
    }
    if (document.getElementsByClassName('tag-button')[0]) {
      if (e.target.className !== 'tag-blocker' && e.target.classList.contains('todo-sell-button') !== true
      && e.target.className !== 'tag-search' && e.target.classList.contains('tag-name-container') !== true
      && e.target.className !== 'tag-not-found' && e.target.classList.contains('tag-form') !== true
      && e.target.className !== 'add-tag' && e.target.className !== 'add-tag-text') {
      document.getElementsByClassName('tag-blocker')[0].classList.remove('tag-blocker--show');
      document.getElementsByClassName('todo-sell-button')[0].classList.remove('todo-sell-button--clicked');
      document.getElementsByClassName('tag-search')[0].value = "";
      }
    }
    if (document.getElementsByClassName('priority-button')[0]) {
      if (!e.target.classList.contains('priority-clickable-button')) {
        document.getElementsByClassName('priority-clickable-button')[0].classList.remove('priority-clickable-button--clicked');
        document.getElementsByClassName('priority-blocker')[0].classList.remove('priority-blocker--show');
      }
    }
  }
 return (
  <main onClick={(e) => mouseClick(e)}>
      <Navbar />
      <div className="main-content">
        <Sidebar categories={categories} updateCategories={updateCategories} />
        <div className="route">
          <Routes>
            <Route exact path="/" element={<Inbox />}/>
            <Route exact path="/category" element={<Inbox categories={categories} updateCategories={updateCategories} />} />
          </Routes>
      </div>
    </div>
  </main>
 );
};
 
export default App;