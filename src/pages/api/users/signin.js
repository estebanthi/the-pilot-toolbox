import axios from "axios";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {


    if (req.method != "GET") {
        return res.status(404).json("Wrong method")
    }

    const email = req.query.email
    const password = req.query.password

    const userFound = await axios.get(process.env.BASE_URL+"/api/users", {params: {email: email}})
        .then((result) => result.data[0])
        .catch(() => null)

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