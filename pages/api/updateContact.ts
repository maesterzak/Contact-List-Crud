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
  
  const updateContact = await prisma.contact.update({
    where:{
        id:contactData.id
    },
    data:{
        
        name: contactData.name,
        email:contactData.email,
        address: contactData.address,
        gender: contactData.gender,
        image: contactData.chat_image,
    }
  })
  const contacts = await prisma.contact.findMany();
  res.status(200).json(contacts)

}
