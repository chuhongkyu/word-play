import { connectDB } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        const client = await connectDB;
        const db = client.db('forum');
        const results = await db.collection('test').find({}, { projection: { contents: 0 } }).toArray();
        return response.status(200).json(results);
    } else {
        response.setHeader('Allow', ['GET']);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }
}