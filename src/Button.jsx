import { useNavigate } from "react-router-dom";
import "./Button.css"

export default function Button({ redirect_to, data_to_redirect, text }) {
	const navigate = useNavigate();
	function handler() {
		if (!data_to_redirect) {
			navigate(redirect_to, data_to_redirect);
		}
		else if (data_to_redirect && redirect_to) {
			console.log("from button handler", data_to_redirect);

			fetch("http://localhost:3000/add", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data: data_to_redirect }),
			})
				.then(response => {
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					return response.json();
				})
				.then(data => {
					console.log('Success:', data);
				})
				.catch(error => {
					console.error('Error:', error);
				});
			window.location.replace('http://localhost:5173/');
		}
	}
	return (
		<button
			id="myButton"
			onClick={handler}>
			{text}
		</button>
	)
}
