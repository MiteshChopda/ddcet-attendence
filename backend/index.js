import express from "express";
const app = express()
const port = 3000
import database from "./database.js";
import crypto from "crypto";

app.get('/',async (req, res) => {
  	// res.send("express is up " );
  	res.send(await database.getAllRecords());
})

app.post('/add',async (req, res) => {
	const uuid = crypto.randomUUID();

	const newRecord = {
         id: uuid,
         hours: 3.5,
         content: 'Sample content',
         date: '2023-12-07',
         flag: 'active'
     };
    const recordStatus =  await database.createRecord(newRecord);
  	res.send( recordStatus);
})

app.get('/records',async (req, res) => {
	const allRecords = await database.getAllRecords();
	res.send(allRecords);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// app.js

async function main() {
    try {
        // Initialize database
        // await database.initialize();

        // CREATE
        const newRecord = {
                    id: 'rec-002',
                    hours: 3.5,
                    content: 'Sample content',
                    date: '2023-12-07',
                    flag: 'active'
                };
        await database.createRecord(newRecord);

        // READ ALL
        const allRecords = await database.getAllRecords();
        console.log('All records:', allRecords);

        // READ ONE
        const singleRecord = await database.getRecordById('rec-001');
        console.log('Single record:', singleRecord);

        // UPDATE
        await database.updateRecord('rec-001', { 
            hours: 4.2, 
            flag: 'completed' 
        });

        // DELETE
        await database.deleteRecord('rec-001');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await database.close();
    }
}
