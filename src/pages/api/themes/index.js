import clientPromise from "../../../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {

    if (req.method == 'GET') {
        const client = await clientPromise;
        const db = client.db();

        let result = null
        if (req.query._id) {
            result = await db.collection("Themes").findOne({_id: req.query._id})
        } else {
            result = await db.collection("Themes").find({category: ObjectId(req.query.category)}).toArray().then(r => JSON.stringify(r)).then(r => JSON.parse(r))
        }

        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json('Theme not found')
        }

        return
    }

}