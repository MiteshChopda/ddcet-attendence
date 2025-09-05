import "./MainSection.css";

export default function MainSection({records}){

	let dateOnly = new Date().toDateString();
	
	// new Date("2023-12-06T18:30:00.000Z").getDate()
	// console.log(new Date("2023-12-06T18:30:00.000Z").getDate());
	return(
	<>
		<div className="mainForMainSection">
			<div className="Calender">
				<div className="month">
					<h3>{dateOnly}</h3>
						{records.map(record=>(
							<span key={record.id}
							>	
							{  new Date(record.created_at).getDate().toString()}
							</span>	
						))}
					<span 
						onClick={()=>{console.log("Hey Bruno")}}
						r=''>
					21</span>
					<span >22</span>
					<span r=''>23</span>
					<span r=''>24</span>
				</div>
			</div>
		</div>
	</>
	)
}
