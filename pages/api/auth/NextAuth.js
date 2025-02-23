import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../utils/dbConnect';

dbConnect();

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await User.findOne({ email: credentials.email });
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return { id: user._id, email: user.email, role: user.role };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});