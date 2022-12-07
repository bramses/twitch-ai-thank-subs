// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    subName: string
    text: string
    voice: string
}

let subName = ''
let text = ''
let voice = ''

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

   if (req.method === 'POST') {
        // Process a POST request
        subName = req.body.subName
        text = req.body.text
        voice = req.body.voice
        res.status(200).json({ subName, text, voice })

       // after fifteen seconds, reset the variables
         setTimeout(() => {
            subName = ''
            text = ''
            voice = ''
        }, 20000)
    }

   if (req.method === 'GET') {
        // Process a GET request
        res.status(200).json({ subName: subName, text: text, voice: voice })
    }
}
