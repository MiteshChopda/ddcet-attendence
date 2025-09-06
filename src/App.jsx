
import React, { useState, useEffect } from 'react';
import InputCard from './InputCard.jsx'
import MainSection from './MainSection.jsx'
import Navbar from "./Navbar.jsx"
import Logger from "./Logger.jsx";
export default function App() {

	// fetching data from database server
    // it is array of objets 
	const [data, setData] = useState([]);
    useEffect(() => {
      fetch('http://10.39.215.127:3000/records') 
        .then(response => response.json()) 	
        .then(json => setData(json)) 
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log("data is loaded: ",data)  

	return (
    	<>
			<Navbar/>
			<MainSection records={data} />
    	</>
  )
}
