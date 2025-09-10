
import { useNavigate, useLocation } from "react-router-dom";
import "./Details.css"
import Navbar from "./Navbar.jsx"
import Button from "./Button.jsx";

export default function Details() {
	const location = useLocation();
	const { record } = location.state || {};
	console.log("We are in Details.jsx")
	function editRecord(e) {

	}
	return (
		<>
			<Navbar buttonId="home" ButtonName="home" />
			<div className="details">
				<h3>{new Date(record.created_at).toDateString()} || <p>{record.hours} Hours Studied</p></h3>
				<p>
					{record.content}
				</p>
				<div className="operations">

					<Button text="Edit" id={"edit"} Data={record} />
					<Button text="Delete" DataId={record.id} id={"delete"} Data={record} />
				</div>
			</div>
		</>
	)
}
