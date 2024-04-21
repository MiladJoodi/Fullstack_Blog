import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string;
    userRole?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      userId?: string;
      userRole?: string;
    } & DefaultSession['user'];
  }
}