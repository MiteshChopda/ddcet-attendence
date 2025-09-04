import "./MainSection.css";

export default function MainSection(){

	let dateOnly = new Date().toDateString();
	return(
	<>
		<div className="mainForMainSection">
			<div className="Calender">
				<div className="month">
					<h3>{dateOnly}</h3>
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
