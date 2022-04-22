import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {

    if (req.method == 'GET') {
        const client = await clientPromise;
        const db = client.db();

        let result = null
        if (req.query.slug) {
            result = await db.collection("Categories").findOne({slug: req.query.slug})
        } else {
            result = await db.collection("Categories").find({}).toArray().then(r => JSON.stringify(r)).then(r => JSON.parse(r))
        }

        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json('Category not found')
        }

        return
    }

}