import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import CreateTodo from "./components/createTodo";
import Navbar from "./components/navbar";
 
const App = () => {
  function mouseClick(e) {
    if (e.target.className.includes('search-container') || e.target.className.includes('search-container__search-icon') ||
     e.target.className.includes('search-container__navbar-search')) {
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
 return (
  <div onClick={(e) => mouseClick(e)}>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<CreateTodo />} />
    </Routes>
  </div>
 );
};
 
export default App;