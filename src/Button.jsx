import { useNavigate } from "react-router-dom";
import "./Button.css"

export default function Button({ Data, DataId, text, id }) {
	const navigate = useNavigate();
	function handler(e) {
		let id = e.target.id
		console.log("Button Id", id);

		if (id == "new") {
			navigate('/new');
		}
		else if (id == "home") {
			navigate('/');
		}
		else if (id == "delete") {
			// DELETE REQUEST
			const userConfirm = window.confirm("THIS RECORD WILL BE DELETE. DO YOU WANT TO PROCEED");
			console.log("for deletion :", DataId);

			if (userConfirm) {
				fetch("http://localhost:3000/delete", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ data: DataId }),
				})
					.then(response => {
						if (!response.ok) {
							throw new Error(`UPDATE: HTTP error! status: ${response.status}`);
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
		else if (id == "edit") {
			//Data = {recordId:"asda",Content:"asd"........}
			let { hours, content, id } = Data;
			navigate("/edit",
				{
					state: {
						hours, content, id
					}
				}
			);
		}
		else if (id == "inputCard") {
			if (DataId) {
				//UPDATE req
				Data[2] = DataId
				console.log(Data);

				// Data = [0,"content","id"]
				fetch("http://localhost:3000/update", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ data: Data }),
				})
					.then(response => {
						if (!response.ok) {
							throw new Error(`UPDATE: HTTP error! status: ${response.status}`);
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
				return
			}
			// ADD request
			// Data = [0,"content"]
			console.log("from button handler", Data);
			fetch("http://localhost:3000/add", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data: Data }),
			})
				.then(response => {
					if (!response.ok) {
						window.alert("Today's Record Already Exits")
						if (response.status == 696) {
						}
						throw new Error(`ADD: HTTP error! status: ${response.status}`);
					}
					return response.json();
				})
				.then(data => {
					console.log('Success:', data);
					window.location.replace('http://localhost:5173/');
				})
				.catch(error => {
					console.error('Error:', error);
					window.location.replace('http://localhost:5173/');
				});
		}
	}
	return (
		<button
			id={id}
			className="myButton"
			onClick={handler}>
			{text}
		</button>
	)
}
