import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import TodoList from "./components/todos";
import CreateTodo from "./components/createTodo";
import CreateCategory from "./components/createCategory";
 
const App = () => {
  function mouseClick(e) {
    console.log(e.target)
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
    if (e.target.className !== 'tag-blocker' && e.target.classList.contains('todo-sell-button') !== true
      && e.target.className !== 'tag-search' && e.target.classList.contains('tag-name-container') !== true) {
      document.getElementsByClassName('tag-blocker')[0].classList.remove('tag-blocker--show');
      document.getElementsByClassName('todo-sell-button')[0].classList.remove('todo-sell-button--clicked')
    }
  }
 return (
  <main onClick={(e) => mouseClick(e)}>
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="route">
          <Routes>
            <Route exact path="/" element={<CreateTodo />}/>
          </Routes>
      </div>
    </div>
  </main>
 );
};
 
export default App;