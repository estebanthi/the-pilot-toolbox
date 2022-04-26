import bcrypt from "bcrypt"
import axios from "axios";
import {use} from "bcrypt/promises";
import clientPromise from "../../../../lib/mongodb";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) {

    if (req.method != "POST") {
        return res.status(404).json("Wrong method")
    }

    const username = req.body.username
    const email = req.body.email;
    const password = req.body.password;

    const client = await clientPromise;
    const db = client.db();
    const userFound = await db.collection("Users").findOne({email: email})

    if (userFound) {
        return res.status(403).json("User already existing")
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    return await db.collection('Users').insertOne({username: username, email: email, isAdmin: false,
        password: hashedPassword, subscribedUntil: null, failed_qcms: [], seen_qcms: [], marked_qcms: []})
        .then(() => res.status(200).json("User added"))
        .catch((err) => res.status(500).json(err))
}