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

                const user = await axios.get("https://the-pilot-toolbox.vercel.app/api/users/signin", {params: {email: credentials.email, password:credentials.password}})
                    .then((userFound) => userFound.data)
                    .catch((err) => {
                        return null
                    })

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