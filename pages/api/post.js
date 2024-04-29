import { connectToDatabase } from "../../src/app/utils/mongodb";

export default async function handler(req,res) {
    if (req.method !=='POST') {
        res.status(405).json({ message:'Method not allowed' });
        return;
    }

    try {
        const { db } = await connectToDatabase();
        const data = req.body;

        const collection = db.collection('cocktails');
        const result = await collection.insertOne(data);

        res.status(201).json({ message:'Item added sucessfully', _id: result.insertedId});
    } catch (error) {
        console.error('Failed to add item', error);
        res.status(500).json({ message: 'Failed to add item:', error: error.message });
    }
}