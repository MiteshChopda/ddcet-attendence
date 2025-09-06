import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Details from "./Details.jsx"

createRoot(document.getElementById('root')).render(
    <Router>
    	<Routes>
    		<Route path="/" element={<App />} />
    	 	<Route path="/details" element={<Details />} />
    	</Routes>
    </Router>
)
