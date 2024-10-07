import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { Axios } from "./axios";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_KEY!,
        }),
    ],
    secret: process.env.NEXT_AUTH_SECRET!,
    pages: {
        signIn: '/',
        error: '/'
    },
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60, // 7 day
    },
    callbacks: {
        // async jwt({ token, user }) {
        //     if ( user ) {
        //         token.user.id = user.id
        //         token.user.name = user.name
        //         token.user.email = user.email
        //         token.user.image = user.image
        //     }
        //     return token
        // },
        // async session({ token, session }) {
        //     session.user.id = token.id
        //     session.user.name = token.name
        //     session.user.email = token.email
        //     session.user.image = token.picture
        //     return session
        // },
        async signIn({ user, account, profile }) {
            if ( account?.provider === 'google' ) {
                Axios.post('/user', {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                })
            }
            return true
        },
        // async redirect({ url, baseUrl }) {
        //     return baseUrl;
        // },
    }
}

export const getAuthSession = () => getServerSession(authOptions)