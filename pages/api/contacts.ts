// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const  prisma = new PrismaClient();
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST"){
    return res.status(405).json({message:'Method not allowed'});
  }
  const contactData = JSON.parse(req.body);
  const savedContact = await prisma.contact.create({
    data:contactData
  })
  res.status(200).json(savedContact)
}
