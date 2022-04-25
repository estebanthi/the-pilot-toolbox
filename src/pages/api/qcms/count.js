import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {

    if (req.method == 'GET') {
        const client = await clientPromise;
        const db = client.db();

        const result = await db.collection("QCMs").find(req.query).count()
        return res.status(200).json(result)

    }

}