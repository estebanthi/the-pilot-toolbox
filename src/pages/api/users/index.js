import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {

    if (req.method == 'GET') {
        const client = await clientPromise;
        const db = client.db();

        const result = await db.collection("Users").find(req.query).toArray().then(r => JSON.stringify(r)).then(r => JSON.parse(r))

        if (result.length) {
            res.status(200).json(result)
        } else {
            res.status(404).json('User not found')
        }

        return
    }

    if (req.method == 'POST') {
        const client = await clientPromise;
        const db = client.db();

        return await db.collection('Users').insertOne(req.body)
            .then(() => res.status(200).json("User added"))
            .catch((err) => res.status(500).json(err))
    }

}