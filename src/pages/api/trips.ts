import { NextApiRequest, NextApiResponse } from "next";
import sampleData from '@/data/sampleData.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(sampleData);
}