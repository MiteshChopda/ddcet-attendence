
import React, { useState, useEffect } from 'react';

import InputCard from './InputCard.jsx'
import MainSection from './MainSection.jsx'
import Navbar from "./Navbar.jsx"

function App() {
	const [data, setData] = useState([]);
    useEffect(() => {
      fetch('http://localhost:3000/records') 
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

export default App
