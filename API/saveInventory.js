import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI; // Add in Vercel env variables
let client;

export default async function handler(req, res) {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  const db = client.db('inventoryDB');
  const collection = db.collection('records');

  if (req.method === 'POST') {
    const data = req.body;
    try {
      await collection.insertOne(data);
      return res.status(200).json({ message: 'Record saved successfully!' });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to save record' });
    }
  }

  if (req.method === 'GET') {
    try {
      const records = await collection.find({}).toArray();
      return res.status(200).json(records);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch records' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
