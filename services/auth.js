import jwt from "jsonwebtoken";
import axios from "axios";

export const login = async (email, password) => {

}

export const sendValidationCode = async (code, email) => {
    await axios.post("/api/mails/send-code", {code: code, email: email})
}

export const sendNewPasswordCode = async (email) => {
    return await axios.put("/api/users/password", {}, {params: {email: email}})
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
        .then((userFound) => userFound.data[0] ? true : false)
        .catch((userNotFound) => false)
}

export const userIsSubscribed = async (email) => {
    const user = await axios.get((process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL)+'/api/users', {params: {email: email}})
        .then((res) => res.data[0])
    return Date.now() < user.subscribedUntil
}

export const getUser = async (email) => {
    const user = await axios.get('/api/users', {params: {email: email}})
        .then((res) => res.data[0])
    return user
}