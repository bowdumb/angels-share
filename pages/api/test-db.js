import { connectToDatabase } from '../../src/app/utils/mongodb'; // Adjust the path as needed

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    // Perform a simple operation (e.g., listing collections)
    const collections = await db.listCollections().toArray();
    if (collections.length > 0) {
      return res.status(200).json({ message: 'Successfully connected to the database', collections });
    } else {
      return res.status(500).json({ message: 'Connected to the database, but no collections found' });
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ message: 'Failed to connect to the database', error: error.message });
  }
}
