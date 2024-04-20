import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prismadb = globalForPrisma.prisma ?? prismaClientSingleton();

export default prismadb;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismadb;