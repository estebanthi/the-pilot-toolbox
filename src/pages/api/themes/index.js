import clientPromise from "../../../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {

    if (req.method == 'GET') {
        const client = await clientPromise;
        const db = client.db();

        const result = await db.collection("Themes").find(req.query).toArray().then(r => JSON.stringify(r)).then(r => JSON.parse(r))
        return res.status(200).json(result)
    }

}