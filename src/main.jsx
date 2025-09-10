import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Details from "./Details.jsx"
import InputCard from './InputCard.jsx';

createRoot(document.getElementById('root')).render(
    <Router>
    	<Routes>
    		<Route path="/" element={<App />} />
			<Route path="/new" element={<InputCard />} />
    	 	<Route path="/details" element={<Details />} />
			<Route path="/edit" element={<InputCard />} />
    	</Routes>
    </Router>
)
