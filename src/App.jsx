
import { useState, useEffect } from 'react';
import MainSection from './MainSection.jsx'
import Navbar from "./Navbar.jsx"
export default function App() {

  // fetching data from database server
  // it is array of objets 
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/records')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  console.log("data is loaded: ", data)

  return (
    <>
      <Navbar buttonId="new" ButtonName="new" />
      <MainSection  records={data} />
    </>
  )
}
