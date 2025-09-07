import express from "express";
import cors from "cors";
import crypto from "crypto";
import Database, { pool, initializeDatabase } from "./database_v2.js";

const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



function getDate() {
	const today = new Date();
	let day = today.getDate();
	let month = today.getMonth() + 1; // Months are zero-based, so add 1
	const year = today.getFullYear();

	// Add leading zeros if day or month is less than 10
	if (day < 10) {
		day = '0' + day;
	}
	if (month < 10) {
		month = '0' + month;
	}
	console.log("getDate(): ", year + '/' + month + '/' + day);

	return year + '/' + month + '/' + day
	// return today
}

app.use(cors());
initializeDatabase();
app.get('/', async (req, res) => {
	res.send("express is up ");
})

app.get('/today', async (req, res) => {
	// "2005/02/25", "2005/02/27"
	let text = await Database.getByDateRange(getDate(), getDate());
	if (text[0]) {
		console.log("/today if", text);
		res.status(200).json({ message: 'Operation successful!' });

	} else {
		console.log("/today else", text);
		res.status(500);

	}
})

app.post('/add', async (req, res) => {
	console.log("/add");
	let text = await Database.getByDateRange(getDate(), getDate());
	if (text[0]) {
		res.send("Today's record already exists.")
		return;
	}
	const uuid = crypto.randomUUID();
	let { data } = req.body;
	console.log(data);
	const newRecord = {
		hours: data[0],
		content: data[1],
		date: getDate(),
		flag: 'active'
	};
	const recordStatus = await Database.create(uuid, newRecord);
	console.log(recordStatus);
	res.send(recordStatus);
})

app.get('/records', async (req, res) => {
	console.log("/records");

	// const allRecords = await database.getAllRecords();
	console.log("Reqest for records");
	const allRecords = await Database.getAll();
	console.log(allRecords);

	res.send(allRecords);
})

app.listen(port, '0.0.0.0', () => {
	console.log(`Example app listening on port ${port}`)
})
