import { connectDB } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        try {
            const client = await connectDB;
            const db = client.db('forum');
            const data = request.body;

            const result = await db.collection('test').insertOne(data);
            return response.status(200).json(result);
        }catch (error) {
            console.error('Request error', error);
            return response.status(500).json({ error: 'Error inserting data' });
        }
    } else {
        return response.status(400).end(`Method ${request.method} Not Allowed`);
    }
}