import express from "express";
import cors from "cors";
import crypto from "crypto";
import Database, { pool, initializeDatabase} from "./database_v2.js";

const app = express()
const port = 3000

app.use(cors());
initializeDatabase();
app.get('/',async (req, res) => {
  	res.send("express is up " );
  	// let data = await database.getAllRecords() 
	// console.log(data);
  	// res.send(allRecords);
})

app.post('/add',async (req, res) => {
	const uuid = crypto.randomUUID();

	const newRecord = {
         hours: 1,
         content: 'vh svfuagu adavasbdjb asldjna sdb ab',
         date: '2023-01-09',
         flag: 'active'
     };
    const recordStatus =  await Database.create(uuid,newRecord);
  	res.send( recordStatus);
})

app.get('/records',async (req, res) => {
	// const allRecords = await database.getAllRecords();
	console.log("Reqest for records");
  	const allRecords = await Database.getAll();
	res.send(allRecords);
})

app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})
