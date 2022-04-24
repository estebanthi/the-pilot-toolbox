import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";
import {createEntrypoints} from "next/dist/build/entries";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text"},
                password: {  label: "Mot de passe", type: "password" }
            },
            async authorize(credentials, req) {

                const user = await axios.get(process.env.BASE_URL+"/api/users/signin", {params: {email: credentials.email, password:credentials.password}})
                    .then((userFound) => userFound.data)
                    .catch((err) => null)

                if (user) {
                    console.log(user)
                    return user
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/auth/signin"
    },
    secret: process.env.AUTH_HASH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 3 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },

})