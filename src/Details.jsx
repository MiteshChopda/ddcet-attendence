
import { useNavigate, useLocation } from "react-router-dom";
import "./Details.css"
import Navbar from "./Navbar.jsx"
export default function Details() {
	const location = useLocation();
	const {record} = location.state || {};
	console.log("We are in Details.jsx")
	console.log(record.record)
	return(
		<>	
			<Navbar/>
			<div className="details">
			<h3>{new Date(record.created_at).toDateString()}</h3>
			<p>{record.content}
			</p>
			</div>
		</>
	)
}
