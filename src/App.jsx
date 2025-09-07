
import React, { useState, useEffect } from 'react';
import InputCard from './InputCard.jsx'
import MainSection from './MainSection.jsx'
import Navbar from "./Navbar.jsx"
export default function App() {

  // fetching data from database server
  // it is array of objets 
  const [data, setData] = useState([]);
  const [today, setToday] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/today")
      .then(response => response.status)
      .then(status => {
        console.log(status);
        if (status==200) { setToday(true) }
        else{
          setToday(false);
        }
      })
      .catch(error => console.error('Error fetching today:', error));
    fetch('http://10.39.215.127:3000/records')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
    

  }, []);
  console.log("today:",today);
  console.log("data is loaded: ", data)

  return (
    <>
      <Navbar />
      <InputCard todayStatus={today} />
      <MainSection todayStatus={today} records={data} />
    </>
  )
}
