import clientPromise from "../../../../lib/mongodb";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {

    console.log('2')

    if (req.method != "GET") {
        return res.status(404).json("Wrong method")
    }

    const email = req.query.email
    const password = req.query.password

    const client = await clientPromise;
    const db = client.db();
    const userFound = await db.collection("Users").findOne({email: email})

    if (!userFound) {
        res.status(404).json('User not found')
        return
    }


    const passwordVerif = await bcrypt.compare(password, userFound.password)

    if (!passwordVerif) {
        return res.status(404).json("Wrong credentials")
    }

    return res.status(200).json(userFound)


}