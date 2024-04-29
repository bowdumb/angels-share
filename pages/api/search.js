import { connectToDatabase } from "@/app/utils/mongodb";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Only GET requests are allowed' });
    }

    const { query } = req.query;
        if(!query) {
            return res.status(400).json({ message: 'A search query is required' });
        }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('cocktails');
        const results = await collection.find({
            name: { $regex: query, $options: 'i' },
        }).toArray();

        res.status(200).json(results);
    } catch (error) {
        console.error('Search API error:', error);
        res.status(500).json({ message: 'Error performing search', error: error.message });
    }
}