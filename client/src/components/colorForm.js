import React from "react";
import { createPath } from "react-router-dom";

export default function Colors(props) {
	const {category, colors, updateCategory} = props;

	//updates category and removes color dropdown
	function buttonClick(e) {
		updateCategory({color: {
			colorHex: e.target.getAttribute("data-color-hex"),
			colorName: e.target.getAttribute("data-color-name")
		}});
		document.getElementsByClassName('color-dropdown')[0].classList.toggle('color-dropdown--show');
		document.getElementsByClassName('category-form')[0].classList.toggle('category-form--height');
	}

	function ColorsList() {
		let colorSelects = [];
		let currentCheck = [];
		for (const color in colors) {
			currentCheck = [];
			if (category.color.colorHex === colors[color]) {
				currentCheck = [
				<span className="material-symbols-outlined color-option__check" 
				 key="check" style={{color: colors[color]}}>
					done
				</span>
				]
			}
			colorSelects.push(
				<li className="color-option" key={colors[color]} data-color-hex={`${colors[color]}`} data-color-name={`${color}`} onClick={(e) => buttonClick(e)}>
					<span className="color-option__color" style={{backgroundColor: colors[color]}}/>
					<span className="color-option__name">{color}</span>
					{currentCheck}
				</li>
			)
		}
		return colorSelects;
	}

	return (
		<div className="form-group color-group">
			<ul className="color-dropdown">
				{ColorsList()}
			</ul>
		</div>
	)
}