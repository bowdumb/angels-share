import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

export async function connectToDatabase() {
    if (!dbConnection) {
        await client.connect();
        dbConnection = client.db(process.env.MONGO_DB || "angels-share"); // Ensure the database name is correct
    }
    return dbConnection;
}