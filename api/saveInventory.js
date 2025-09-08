// pages/api/saveInventory.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb+srv://salcer2284:YOUR_PASSWORD@cluster0.s6xcxrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  await clientPromise; // ensure client is connected
  const db = client.db('inventoryDB');       // database name
  const collection = db.collection('records'); // collection name

  if (req.method === 'POST') {
    let data = req.body;

    // Ensure JSON is parsed
    if (typeof data === 'string') data = JSON.parse(data);

    try {
      await collection.insertOne(data);
      return res.status(200).json({ message: 'Record saved successfully!' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save record' });
    }
  }

  if (req.method === 'GET') {
    try {
      const records = await collection.find({}).toArray();
      return res.status(200).json(records);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch records' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
