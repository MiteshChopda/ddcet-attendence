
import  { useState } from 'react';
import { useLocation } from 'react-router-dom';

import "./InputCard.css";
import Button from "./Button.jsx"
import Navbar from "./Navbar.jsx"


export default function InputCard({ recordId }) {

	const location = useLocation() ;
	const { hours,content, id } = location.state || {};
	// console.log(hours,content, id);
	
	const [inputValues, setInputValues] = useState([hours ?? 0,content ?? ""])
	const handleInput = (event) => {
		// prev is array containing noOfHours and DayDescription
		// value liek prev=[125,"Today was xyz"]
		setInputValues(prev => {
			 
			// used deep copy because shallow copy was not working
			let newArray = structuredClone(prev)
			if (event.target.name == "noOfHours") {
				newArray[0] = +event.target.value
			}
			else if (event.target.name == "dayDescription") {
				newArray[1] = event.target.value
			}
			return newArray
		})
	}
	return (
		<>
			<Navbar buttonId="home" ButtonName="home" />
			<div className="main">
				<div className="inputField">
					<label
						htmlFor="noOfHours">
						Hours :
					</label>
					<input
						name="noOfHours"
						type="number"
						min="0"
						max="8"
						value={inputValues[0] || "0"}
						onChange={handleInput}
					/>
					<label
						htmlFor="dayDescription">
						Describe :
					</label>
					<textarea
						name="dayDescription"
						type="text"
						rows="3"
						cols="30"
						placeholder="Describe Today Here"
						value={inputValues[1]}
						onChange={handleInput}
					/>
					<Button text="Done" id={"inputCard"} DataId={id ?? false} Data={inputValues} />
				</div>
			</div>
		</>
	)

}
