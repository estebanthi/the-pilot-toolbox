import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {

    if (req.method == 'GET') {
        const client = await clientPromise;
        const db = client.db();
        var categories = await db.collection("Categories").find({}).toArray().then(r => JSON.stringify(r)).then(r => JSON.parse(r));
        res.status(200).json(categories);
        return;
    }

}