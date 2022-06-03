// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  try {
    await fetch('http://localhost:3002/home/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    }).then((result) => {
      if(result.status != 200)
        res.status(500).send({ message: "err" })
      res.status(200).end()
    }).catch((err) => {
      console.log("failed")
      res.status(500).send({ message: err })
    })
  }
  catch {
    res.status(500).send({ message: "err" })
  }
  return
}
