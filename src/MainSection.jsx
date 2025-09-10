
import { useNavigate } from "react-router-dom";
import "./MainSection.css";

export default function MainSection({ records }) {
	console.log("records from MainSelection", records);
	let dateOnly = new Date().toDateString();
	let navigate = useNavigate();

	const months = [...new Set(
		records.map(record =>
			new Date(record.created_at).toLocaleString("en-US", { month: "long" })
		)
	)];
	function on_click(e) {
		let id = e.target.id;
		let _record = records.find(record => record.id === id);
		console.log("we are here on_click", _record)
		navigate("/details", { state: { record: _record } });
	}

	return (
		<div className="mainForMainSection">
			<div className="Months">
				{months.map(month => (
					<div className="month" key={month} id={month}>
						<h3>{month}</h3>
						{records
							.filter(record =>
								new Date(record.created_at).toLocaleString("en-US", { month: "long" }) === month
							).sort((a, b) =>
								(new Date(a.created_at).getDate())-(new Date(b.created_at).getDate())
								
							)
							.map(record => (
								<span
									id={record.id}
									key={record.id}
									{...(+record.hours <= 1 ? { r: "" } : {})}
									onClick={on_click}
								>
									{String(new Date(record.created_at).getDate()).padStart(2, "0")}
								</span>
							))}
					</div>
				))}
			</div>
		</div>
	);
}
