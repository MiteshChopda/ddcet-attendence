import mongoose from 'mongoose';

// MongoDB connection configuration
const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 27017,
    database: process.env.DB_NAME || 'ddcet',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
};

// Create MongoDB connection string
const mongoURI = process.env.MONGODB_URI ||
    `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

// Define the schema
const ddcetSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    hours: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    flag: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive', 'deleted']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Create the model
const DDCETModel = mongoose.model('DDCET', ddcetSchema);

// Initialize database connection
export async function initializeDatabase() {
    try {
        
        //use this if mongoURI -> await mongoose.connect(mongoURI, {
        await mongoose.connect("mongodb://localhost:27017/mydatabase", {
        });
        console.log('MongoDB connection established successfully.');

        // Create indexes
        await DDCETModel.createIndexes();
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

        try {
            const newRecord = new DDCETModel({
                id,
                hours,
                content,
                date,
                flag
            });

            const result = await newRecord.save();
            return {
                success: true,
                insertId: result._id,
                affectedRows: 1
            };
        } catch (error) {
            console.error('Error creating record:', error);
            throw error;
        }
    }

    // Read - Get single record by ID
    static async getById(id) {
        try {
            const record = await DDCETModel.findOne({ id });
            return record;
        } catch (error) {
            console.error('Error fetching record by ID:', error);
            throw error;
        }
    }

    // Read - Get all records
    static async getAll(limit = 1000, offset = 0) {
        try {
            const records = await DDCETModel.find()
                .sort({ created_at: -1 })
                .limit(limit)
                .skip(offset);
            return records;
        } catch (error) {
            console.error('Error fetching all records:', error);
            throw error;
        }
    }

    // Read - Get records by month (extract month from date field)
    static async getByMonth(month) {
        try {
            // Assuming month is like 'jan', 'feb', etc.
            const monthNumber = this.getMonthNumber(month);
            const startDate = new Date(new Date().getFullYear(), monthNumber, 1);
            const endDate = new Date(new Date().getFullYear(), monthNumber + 1, 0);

            const records = await DDCETModel.find({
                date: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).sort({ created_at: -1 });

            return records;
        } catch (error) {
            console.error('Error fetching records by month:', error);
            throw error;
        }
    }

    // Read - Get records by flag
    static async getByFlag(flag) {
        try {
            const records = await DDCETModel.find({ flag })
                .sort({ created_at: -1 });
            return records;
        } catch (error) {
            console.error('Error fetching records by flag:', error);
            throw error;
        }
    }

    // Read - Get records by date range
    static async getByDateRange(startDate, endDate) {
        try {
            const records = await DDCETModel.find({
                date: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }).sort({ date: -1 });

            return records;
        } catch (error) {
            console.error('Error fetching records by date range:', error);
            throw error;
        }
    }

    // Update - Update record by ID
    static async update(id, data) {
        try {
            // Remove undefined fields
            const updateData = {};
            Object.keys(data).forEach(key => {
                if (data[key] !== undefined) {
                    updateData[key] = data[key];
                }
            });

            if (Object.keys(updateData).length === 0) {
                throw new Error('No fields to update');
            }

            updateData.updated_at = new Date();

            const result = await DDCETModel.findOneAndUpdate(
                { id },
                { $set: updateData },
                { new: true, runValidators: true }
            );

            return {
                success: true,
                affectedRows: result ? 1 : 0
            };
        } catch (error) {
            console.error('Error updating record:', error);
            throw error;
        }
    }

    // Delete - Delete record by ID
    static async delete(id) {
        try {
            const result = await DDCETModel.findOneAndDelete({ id });
            return {
                success: true,
                affectedRows: result ? 1 : 0
            };
        } catch (error) {
            console.error('Error deleting record:', error);
            throw error;
        }
    }

    // Utility - Get total count
    static async getCount() {
        try {
            const count = await DDCETModel.countDocuments();
            return count;
        } catch (error) {
            console.error('Error getting count:', error);
            throw error;
        }
    }

    // Utility - Get total hours by month
    static async getTotalHoursByMonth(month) {
        try {
            const monthNumber = this.getMonthNumber(month);
            const startDate = new Date(new Date().getFullYear(), monthNumber, 1);
            const endDate = new Date(new Date().getFullYear(), monthNumber + 1, 0);

            const result = await DDCETModel.aggregate([
                {
                    $match: {
                        date: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total_hours: { $sum: '$hours' }
                    }
                }
            ]);

            return result.length > 0 ? result[0].total_hours : 0;
        } catch (error) {
            console.error('Error getting total hours by month:', error);
            throw error;
        }
    }

    // Close connection
    static async closeConnection() {
        try {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
        } catch (error) {
            console.error('Error closing connection:', error);
            throw error;
        }
    }

    // Helper method to convert month name to number
    static getMonthNumber(month) {
        const months = {
            'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
            'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
        };
        return months[month.toLowerCase()] || 0;
    }
}

// Usage Examples:
/*
import { v4 as uuidv4 } from 'uuid';
import { Database, initializeDatabase } from './database';

async function examples() {
    // Initialize database
    await initializeDatabase();
    
    // Create a new record
    const newId = uuidv4();
    await Database.create(newId, {
        hours: 3.50,
        content: 'Sample content',
        date: new Date('2023-12-06T18:30:00.000Z'),
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
    
    // Close connection when done
    await Database.closeConnection();
}
*/