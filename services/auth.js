import jwt from "jsonwebtoken";
import axios from "axios";

export const login = async (email, password) => {

}

export const sendValidationCode = async (code, email) => {
    await axios.post("/api/mails/send-code", {code: code, email: email})
}

export const generateValidationToken = async (code, username, email, password) => {
    var token = await jwt.sign({code: code, username: username, email: email, password: password}, process.env.NEXT_PUBLIC_JWT_SIGN)
    return token
}

export const registerUser = async (username, email, password) => {
    const newUser = await axios.post("/api/users/register", {username: username, email: email, password: password})
    return newUser.data
}

export const checkEmailTaken = async (email) => {
    return await axios.get("/api/users", {params: {email: email}})
        .then((userFound) => true)
        .catch((userNotFound) => false)
}