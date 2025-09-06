import mysql from "mysql2/promise";

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'ddcet',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create connection pool

// Table creation query
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ddcettable (
        id VARCHAR(36) PRIMARY KEY,
        hours DECIMAL(10, 2) NOT NULL,
        content TEXT,
        date DATETIME NOT NULL,
        flag VARCHAR(10) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        month VARCHAR(3) GENERATED ALWAYS AS (
            CASE 
                WHEN MONTH(created_at) = 1 THEN 'jan'
                WHEN MONTH(created_at) = 2 THEN 'feb'
                WHEN MONTH(created_at) = 3 THEN 'mar'
                WHEN MONTH(created_at) = 4 THEN 'apr'
                WHEN MONTH(created_at) = 5 THEN 'may'
                WHEN MONTH(created_at) = 6 THEN 'jun'
                WHEN MONTH(created_at) = 7 THEN 'jul'
                WHEN MONTH(created_at) = 8 THEN 'aug'
                WHEN MONTH(created_at) = 9 THEN 'sep'
                WHEN MONTH(created_at) = 10 THEN 'oct'
                WHEN MONTH(created_at) = 11 THEN 'nov'
                WHEN MONTH(created_at) = 12 THEN 'dec'
            END
        ) STORED,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

// Initialize database and create table
export async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        await connection.execute(createTableQuery);
        connection.release();
        console.log('Database initialization complete.');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// CRUD Operations
export default class Database {
    // Create - Insert new record
    static async create(id, data) {
        const { hours, content, date, flag = 'active' } = data;
        
        const query = `
            INSERT INTO ddcettable (id, hours, content, date, flag) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        try {
            const [result] = await pool.execute(query, [id, hours, content, date, flag]);
            return { success: true, insertId: result.insertId, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error creating record:', error);
            throw error;
        }
    }

    // Read - Get single record by ID
    static async getById(id) {
        const query = 'SELECT * FROM ddcettable WHERE id = ?';
        
        try {
            const [rows] = await pool.execute(query, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error fetching record by ID:', error);
            throw error;
        }
    }

    // Read - Get all records
    static async getAll(limit = 1000, offset = 0) {
        const query = 'SELECT * FROM ddcettable ORDER BY created_at DESC';
        
        try {
            const [rows] = await pool.execute(query);
            return rows;
        } catch (error) {
            console.error('Error fetching all records:', error);
            throw error;
        }
    }

    // Read - Get records by month
    static async getByMonth(month) {
        const query = 'SELECT * FROM ddcettable WHERE month = ? ORDER BY created_at DESC';
        
        try {
            const [rows] = await pool.execute(query, [month.toLowerCase()]);
            return rows;
        } catch (error) {
            console.error('Error fetching records by month:', error);
            throw error;
        }
    }

    // Read - Get records by flag
    static async getByFlag(flag) {
        const query = 'SELECT * FROM ddcettable WHERE flag = ? ORDER BY created_at DESC';
        
        try {
            const [rows] = await pool.execute(query, [flag]);
            return rows;
        } catch (error) {
            console.error('Error fetching records by flag:', error);
            throw error;
        }
    }

    // Read - Get records by date range
    static async getByDateRange(startDate, endDate) {
        const query = 'SELECT * FROM ddcettable WHERE date BETWEEN ? AND ? ORDER BY date DESC';
        
        try {
            const [rows] = await pool.execute(query, [startDate, endDate]);
            return rows;
        } catch (error) {
            console.error('Error fetching records by date range:', error);
            throw error;
        }
    }

    // Update - Update record by ID
    static async update(id, data) {
        const fields = [];
        const values = [];

        // Build dynamic update query
        if (data.hours !== undefined) {
            fields.push('hours = ?');
            values.push(data.hours);
        }
        if (data.content !== undefined) {
            fields.push('content = ?');
            values.push(data.content);
        }
        if (data.date !== undefined) {
            fields.push('date = ?');
            values.push(data.date);
        }
        if (data.flag !== undefined) {
            fields.push('flag = ?');
            values.push(data.flag);
        }

        if (fields.length === 0) {
            throw new Error('No fields to update');
        }

        values.push(id);
        const query = `UPDATE ddcettable SET ${fields.join(', ')} WHERE id = ?`;

        try {
            const [result] = await pool.execute(query, values);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error updating record:', error);
            throw error;
        }
    }

    // Delete - Delete record by ID
    static async delete(id) {
        const query = 'DELETE FROM ddcettable WHERE id = ?';
        
        try {
            const [result] = await pool.execute(query, [id]);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error deleting record:', error);
            throw error;
        }
    }

    // Utility - Get total count
    static async getCount() {
        const query = 'SELECT COUNT(*) as total FROM ddcettable';
        
        try {
            const [rows] = await pool.execute(query);
            return rows[0].total;
        } catch (error) {
            console.error('Error getting count:', error);
            throw error;
        }
    }

    // Utility - Get total hours by month
    static async getTotalHoursByMonth(month) {
        const query = 'SELECT SUM(hours) as total_hours FROM ddcettable WHERE month = ?';
        
        try {
            const [rows] = await pool.execute(query, [month.toLowerCase()]);
            return rows[0].total_hours || 0;
        } catch (error) {
            console.error('Error getting total hours by month:', error);
            throw error;
        }
    }

    // Close connection pool
    static async closePool() {
        try {
            await pool.end();
            console.log('Database connection pool closed');
        } catch (error) {
            console.error('Error closing connection pool:', error);
            throw error;
        }
    }
}



// module.exports = {
//     Database,
//     initializeDatabase,
//     pool
// };
const pool = mysql.createPool(dbConfig);
export { pool };



// Usage Examples:
/*
const { v4: uuidv4 } = require('uuid');
const { Database, initializeDatabase } = require('./database');

async function examples() {
    // Initialize database
    await initializeDatabase();
    
    // Create a new record
    const newId = uuidv4();
    await Database.create(newId, {
        hours: 3.50,
        content: 'Sample content',
        date: '2023-12-06T18:30:00.000Z',
        flag: 'active'
    });
    
    // Get record by ID
    const record = await Database.getById(newId);
    console.log('Record:', record);
    
    // Get all records
    const allRecords = await Database.getAll();
    console.log('All records:', allRecords);
    
    // Update record
    await Database.update(newId, {
        hours: 4.0,
        content: 'Updated content'
    });
    
    // Get records by month
    const sepRecords = await Database.getByMonth('sep');
    console.log('September records:', sepRecords);
    
    // Delete record
    await Database.delete(newId);
}
*/
