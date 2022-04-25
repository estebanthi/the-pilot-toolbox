import clientPromise from "../../../../lib/mongodb";
import {getSession} from "next-auth/react";
import {userIsSubscribed} from "../../../../services/auth";

export default async function handler(req, res) {

    if (req.method == 'GET') {
        const client = await clientPromise;
        const db = client.db();

        const result = await db.collection("QCMs").find(req.query).toArray().then(r => JSON.stringify(r)).then(r => JSON.parse(r))
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