import mysql from "mysql2/promise";

class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'root',
            database: process.env.DB_NAME || 'ddcet',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    // Initialize database and create table if not exists
    // ddcetdatatable
    async initialize() {
        try {
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS ddcetdatatable (
                    id VARCHAR(255) PRIMARY KEY,
                    hours DECIMAL(10, 2),
                    content TEXT,
                    date DATE,
                    flag VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `;
            
            await this.pool.execute(createTableQuery);
            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    }

    // CREATE - Insert a new record
    async createRecord(record) {
        try {
            const query = `
                INSERT INTO ddcetdatatable (id, hours, content, date, flag)
                VALUES (?, ?, ?, ?, ?)
            `;
            
            const values = [
                record.id,
                record.hours,
                record.content,
                record.date,
                record.flag
            ];
            
            const [result] = await this.pool.execute(query, values);
            return { success: true, insertId: result.insertId };
        } catch (error) {
            console.error('Error creating record:', error);
            throw error;
        }
    }

    // READ - Get all records
    async getAllRecords() {
        try {
            const query = `SELECT * FROM ddcetdatatable ORDER BY created_at DESC`;
            const [rows] = await this.pool.execute(query);
            return rows;
        } catch (error) {
            console.error('Error fetching records:', error);
            throw error;
        }
    }

    // READ - Get record by ID
    async getRecordById(id) {
        try {
            const query = `SELECT * FROM ddcetdatatable WHERE id = ?`;
            const [rows] = await this.pool.execute(query, [id]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error fetching record:', error);
            throw error;
        }
    }

    // READ - Get records with filters (optional)
    async getRecordsWithFilters(filters = {}) {
        try {
            let query = `SELECT * FROM ddcetdatatable WHERE 1=1`;
            const values = [];
            
            if (filters.flag) {
                query += ` AND flag = ?`;
                values.push(filters.flag);
            }
            
            if (filters.startDate) {
                query += ` AND date >= ?`;
                values.push(filters.startDate);
            }
            
            if (filters.endDate) {
                query += ` AND date <= ?`;
                values.push(filters.endDate);
            }
            
            query += ` ORDER BY created_at DESC`;
            
            const [rows] = await this.pool.execute(query, values);
            return rows;
        } catch (error) {
            console.error('Error fetching filtered records:', error);
            throw error;
        }
    }

    // UPDATE - Update record by ID
    async updateRecord(id, updates) {
        try {
            const allowedFields = ['hours', 'content', 'date', 'flag'];
            const setClauses = [];
            const values = [];
            
            for (const [field, value] of Object.entries(updates)) {
                if (allowedFields.includes(field)) {
                    setClauses.push(`${field} = ?`);
                    values.push(value);
                }
            }
            
            if (setClauses.length === 0) {
                throw new Error('No valid fields to update');
            }
            
            values.push(id);
            
            const query = `
                UPDATE your_table_name 
                SET ${setClauses.join(', ')} 
                WHERE id = ?
            `;
            
            const [result] = await this.pool.execute(query, values);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error updating record:', error);
            throw error;
        }
    }

    // DELETE - Delete record by ID
    async deleteRecord(id) {
        try {
            const query = `DELETE FROM your_table_name WHERE id = ?`;
            const [result] = await this.pool.execute(query, [id]);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error deleting record:', error);
            throw error;
        }
    }

    // Close connection pool
    async close() {
        await this.pool.end();
    }
}

// Create singleton instance
const database = new Database();
export default database;
