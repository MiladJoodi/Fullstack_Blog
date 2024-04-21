import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import prismadb from "./prismadb";
import Credentials from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismadb),
    secret: process.env.NEXTAUTH_KEY,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: 'login',
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                },
                password: {
                    label: 'email',
                    type: 'text',
                }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials.password) return null;

                const user = await prismadb.user.findUnique({
                    where: {email: credentials.email},
                });

                if(!user) return null;
                
                const isPasswordValid = await compare(
                    credentials.password,
                    user.hashedPassword,
                );

                if(!isPasswordValid) return null;

            }
        })
    ]
}