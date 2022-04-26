import clientPromise from "../../../../lib/mongodb";
import {ObjectId} from "mongodb";
import {getSession} from "next-auth/react";


export default async function handler(req, res) {


    if (req.method == 'GET') {
        const client = await clientPromise;
        const db = client.db();

        try {
            if (req.query._id) {
                req.query._id = await ObjectId(req.query._id)
            }
        } catch (err) {
            return res.status(403).json('Invalid _id')
        }

        const result = await db.collection("Users").find(req.query).toArray().then(r => JSON.stringify(r)).then(r => JSON.parse(r))
        return res.status(200).json(result)
    }

    if (req.method == 'POST') {
        const client = await clientPromise;
        const db = client.db();

        return await db.collection('Users').insertOne(req.body)
            .then(() => res.status(200).json("User added"))
            .catch((err) => res.status(500).json(err))
    }

}