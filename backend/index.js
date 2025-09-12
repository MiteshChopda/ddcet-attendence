import express from "express";
import cors from "cors";
import crypto from "crypto";
import Database, {initializeDatabase } from "./database_mongo.js";

const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
initializeDatabase();



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

app.get('/', async (req, res) => {
	res.send("express is up ");
})

app.get('/today', async (req, res) => {
	// "2005/02/25", "2005/02/27"
	let result = await Database.getByDateRange(getDate(), getDate());
	if (result[0]) {
		console.log("/today if", result);
		res.status(200).json({ message: 'Operation successful!' });

	} else {
		console.log("/today else", result);
		res.status(500);

	}
})

app.post('/add', async (req, res) => {
	console.log("/add");
	let result = await Database.getByDateRange(getDate(), getDate());
	if (result[0]) {
		res.status(696).send("Today's record already exists.")
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
app.post('/update', async (req, res) => {
	console.log("/update");
	// data = [0,"sdh","id"]
	let { data } = req.body;
	console.log("Post Data: ", data);
	const newRecord = {
		hours: data[0],
		content: data[1],
	};
	const recordStatus = await Database.update(data[2], newRecord);
	console.log(recordStatus);
	res.send(recordStatus);
})

app.post('/delete', async (req, res) => {
	console.log("/delete");
	// data = "jkasdjkn-adsuh-asdis" (id)
	let {data}  = req.body;
	console.log(data);
	
	console.log("Post Data: ", data);
	const recordStatus = await Database.delete(data);
	console.log(recordStatus);
	res.send(recordStatus);
})

let count=0
app.get('/records', async (req, res) => {
	
	console.log("/records");
	
	// const allRecords = await database.getAllRecords();
	console.log("Reqest for records");
	const allRecords = await Database.getAll();
	console.log(allRecords);
	console.log("COUNT",++count);

	res.send(allRecords);
})

app.listen(port, '0.0.0.0', () => {
	console.log(`Example app listening on port ${port}`)
})
