'use server';

import prismadb from '@/libs/prismadb';
import { hash } from 'bcrypt';

export const CreateUserAction = async (formdata: FormData) => {
  try {
    const { name, email, password } = Object.fromEntries(formdata);

    const hashedPassword = await hash(password as string, 12);

    const user = await prismadb.user.create({
      data: {
        name: name as string,
        email: email as string,
        hashedPassword,
      },
    });

    if (!user) return { success: false };

    return { success: true };
  } catch (error) {
    console.log('CreateUserAction', error);
  }
};

export const CheckUserEmail = async (formdata: FormData) => {
  try {
    const { email } = Object.fromEntries(formdata);

    const user = await prismadb.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (!user) return { success: false };

    return { success: true };
  } catch (error) {
    console.log('CheckUserEmail', error);
  }
};