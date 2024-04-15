import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({ 
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'},
            },
            async authorize(credentials){
                if( !credentials?.email || !credentials?.password){
                    throw new Error('Không tồn tại');
                }

                const users = await prisma.users.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if(!users || !users?.matKhau){
                    throw new Error('Thất bại');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    users.matKhau
                );

                if(!isCorrectPassword){
                    throw new Error('Thất bại');
                }
                return users;
            } 
        })
    ],
    pages: {
        signIn: '/' ,
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,

} ;
export default NextAuth(authOptions);