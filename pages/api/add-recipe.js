import { MongoClient } from 'mongodb';
import { connectToDatabase } from '@/app/utils/mongodb';

const uri = process.env.MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await client.connect();
            const database = client.db('angels-share');
            const collection = database.collection('cocktails');

            const { name, ingredients, instructions, glassware, optional } = req.body;

            const newCocktail = {
                name,
                ingredients,
                instructions,
                glassware,
                optional,
            };

            const result = await collection.insertOne(newCocktail);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add recipe'});
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ error: 'Method is not allowed' });
    }
}