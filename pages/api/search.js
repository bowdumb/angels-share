import { connectToDatabase } from "@/app/utils/mongodb";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Only GET requests are allowed' });
        return;
    }

    const { query } = req.query;
    if (!query) {
        res.status(400).json({ message: 'A search query is required' });
        return;
    }

    try {
        const db = await connectToDatabase();
        if (!db) {
            throw new Error("Failed to connect to the database.");
        }

        const collection = db.collection('cocktails');
        if (!collection) {
            throw new Error("Failed to retrieve the collection.");
        }

        const results = await collection.find({
            name: { $regex: query, $options: 'i' }
        }).toArray();

        res.status(200).json(results);
    } catch (error) {
        console.error('Search API error:', error);
        res.status(500).json({ message: 'Error performing search', error: error.message });
    }
}