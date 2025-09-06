import { useNavigate } from "react-router-dom";
import "./Button.css"

export default function Button({text}){
	const navigate = useNavigate();
		function handler(){
			navigate("/");
		}
	return (
		<button 
		id="myButton" 
		onClick={handler}>
		{text}
		</button>	
	)
}
