import { authOption } from '@/libs/next-auth';
import NextAuth from 'next-auth/next';

const handle = NextAuth(authOption);

export { handle as GET, handle as POST };