import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            id: 'credentials-signin',
            credentials: {
                email: { label: "Email", type: "text"},
                password: {  label: "Mot de passe", type: "password" }
            },
            async authorize(credentials, req) {

                console.log("https://"+(process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL)+"/api/users/signin")
                const user = await axios.get((process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL)+"/api/users/signin", {params: {email: credentials.email, password:credentials.password}})
                    .then((userFound) => userFound.data)
                    .catch((err) => null)

                if (user) {
                    return user
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/auth/signin"
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 3 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },

})