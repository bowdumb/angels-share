import { MongoClient } from 'mongodb';

// MongoDB URI and Options
const uri = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
}

// Create a new MongoClient
const client = new MongoClient(uri, options);

// Database Name
const dbName = process.env.MONGO_DB || "angels-share";

// Connect to the database and return the database instance
export async function connectToDatabase() {
    await client.connect();
    const db = client.db(dbName);
    return { db };
}