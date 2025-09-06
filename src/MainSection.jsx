
import { useNavigate } from "react-router-dom";
import "./MainSection.css";

export default function MainSection({records}){
	console.log("records from MainSelection",records);
	let dateOnly = new Date().toDateString();
	let navigate=useNavigate();
	
	function on_click(e){
		let id= event.target.id;
		let _record = records.find(	record => record.id === id);
		console.log("we are here on_click",_record)
		navigate("/details",{ state: {record:_record}});
	}
	// new Date("2023-12-06T18:30:00.000Z").getDate()
	// console.log(new Date("2023-12-06T18:30:00.000Z").getDate());
	return(
	<>
		<div className="mainForMainSection">
			<div className="Calender">
				<div className="month">
					<h3>{dateOnly}</h3>
						{records.map(record=>(
							<span 
							id={record.id}
							key={record.id}
							{...(+record.hours <= 1 ? {r:""}:{})}
							onClick={on_click}
							>	
							{...((new Date(record.created_at).getDate().toString().length) < 2 ? "0"+(new Date(record.created_at).getDate().toString()) : {})}
							</span>	
						))}
				</div>
			</div>
		</div>
	</>
	)
}
