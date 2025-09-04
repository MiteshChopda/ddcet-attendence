
import React, { useState } from 'react';
import "./InputCard.css";
import Button from "./Button.jsx"

export default function InputCard({heading}) {
	const [inputValues,setInputValues] = useState([0,""])
	const handleInput = (event)=>{
		// prev is array containing noOfHours and DayDescription
		// value liek prev=[125,"Today was xyz"]
		setInputValues(prev=>{
			// used deep copy because shallow copy was
			// not working
			let newArray = structuredClone(prev)
			console.log(newArray)
			if(event.target.name == "noOfHours"){
				newArray[0] = event.target.value
			}
			else if(event.target.name == "dayDescription"){
				newArray[1] = event.target.value
			}
			return newArray	
		})
	}
	return(
	<>
		<div className="main">
			<h1>{heading}</h1>
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
				<Button text="Done"/>
			</div>
		</div>
	</>
	)
	
}
