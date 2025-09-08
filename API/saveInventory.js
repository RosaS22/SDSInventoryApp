// api/saveInventory.js
import { MongoClient } from 'mongodb';

let cachedClient = null;

async function connectToDatabase(uri) {
if (cachedClient) return cachedClient;
const client = new MongoClient(uri);
await client.connect();
cachedClient = client;
return client;
}

export default async function handler(req, res) {
const client = await connectToDatabase(process.env.MONGO_URI);
const db = client.db('inventoryDB');
const collection = db.collection('records');

if (req.method === 'POST') {
    try {
      const record = req.body;
      await collection.insertOne(record);
      return res.status(200).json({ message: 'Saved to MongoDB!', data: record });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save record' });
    }
} else if (req.method === 'GET') {
    try {
    const records = await collection.find({}).toArray();
    return res.status(200).json(records);
    } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch records' });
    }
} else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
}
