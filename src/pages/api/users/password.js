import clientPromise from "../../../../lib/mongodb";
import {ObjectId} from "mongodb";
import {getSession} from "next-auth/react";
import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";


export default async function handler(req, res) {

    if (req.method == 'PUT') {
        if (!req.body.token) {
            const code = Math.round((Math.random() * (999999 - 100000) + 100000))
            await axios.post(process.env.BASE_URL + "/api/mails/send-new-password-code", {
                code: code,
                email: req.query.email
            })
            const token = jwt.sign({code: code}, process.env.JWT_SIGN)
            res.status(200).json(token)
            return
        }
        if (req.body.token) {
            const decrypted = await jwt.decode(req.body.token)

            const authorized = decrypted.code == req.body.code
            if (!authorized) {
                return res.status(403).json('Forbidden')
            }

            const client = await clientPromise;
            const db = client.db();

            const hashedPassword = await bcrypt.hash(req.body.password, 5)
            const result = await db.collection('Users').updateOne({email: req.query.email}, {"$set": {password: hashedPassword}})
            return res.status(200).json(result)
        }
        return res.status(402).json('No token')
    }

}