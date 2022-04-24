import bcrypt from "bcrypt"
import axios from "axios";
import {use} from "bcrypt/promises";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) {

    if (req.method != "POST") {
        return res.status(404).json("Wrong method")
    }

    const username = req.body.username
    const email = req.body.email;
    const password = req.body.password;

    const userFound = await axios.get(process.env.NEXT_PUBLIC_BASE_URL+"/api/users", {params: {email: email}})
        .then((users) => users.data[0])


    if (userFound) {
        return res.status(403).json("User already existing")
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    return await axios.post(process.env.BASE_URL+"/api/users", {username: username, email: email, password: hashedPassword})
        .then((userAdded) => res.status(200).json("User added"))
        .catch((err) => res.status(500).json(err))
}