import clientPromise from "../../../../lib/mongodb";
import {getSession} from "next-auth/react";
import {userIsSubscribed} from "../../../../services/auth";
import {ObjectId} from "mongodb";

export default async function handler(req, res) {

    if (req.method == 'GET') {
        const client = await clientPromise;
        const db = client.db();

        console.log(req.query)

        try {
            if (req.query._id) {
                req.query._id = await ObjectId(req.query._id)
            }
        } catch (err) {
            return res.status(403).json('Invalid _id')
        }

        let result = []

        if (req.query._id) {
            result = await db.collection("QCMs").find(req.query).toArray().then(r => JSON.stringify(r)).then(r => JSON.parse(r))
        }

        console.log(req.query)

        if (req.query['_id[]']) {
            let ids = req.query['_id[]'].map(_id => ObjectId(_id))
            result = await db.collection("QCMs").find({'_id': {"$in": ids}}).toArray().then(r => JSON.stringify(r)).then(r => JSON.parse(r))
            console.log(result)
        }

        const session = await getSession({req})

        if (!session) {
            const freeQcms = result.filter((qcm) => qcm.free == true)
            return res.status(200).json(freeQcms)
        }

        const authorized = await userIsSubscribed(session.user.email)

        if (!authorized) {
            const freeQcms = result.filter((qcm) => qcm.free == true)
            return res.status(200).json(freeQcms)
        }

        return res.status(200).json(result)

    }

}