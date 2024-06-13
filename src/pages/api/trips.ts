import { NextApiRequest, NextApiResponse } from "next";
import sampleData from '@/data/sampleData.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //dealy for 2 seconds mimicking a real world scenario
    await new Promise(resolve => setTimeout(resolve, 2000));
    res.status(200).json(sampleData);
}