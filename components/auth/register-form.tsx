"use client"

import { CreateUserAction } from "@/actions/auth-action";
import SubmitButton from "../ui/submit-button";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
    return (
        <form 
        action={async (formdata) => {
            const email = formdata.get('email');
            const password = formdata.get('password');
            const res = await CreateUserAction(formdata);
    
            if (res?.success) {
              await signIn('credentials', {
                email,
                password,
                callbackUrl: '/',
              });
            }
          }}
        className="mx-auto flex w-96 flex-col gap-y-5">
            <h2 className="text-3xl font-bold">نام نویسی</h2>
            <input 
            type="text"
            placeholder="نام"
            className="rounded-md border p-2 shadow-sm"
            name="name"
            />
            <input 
            type="email"
            placeholder="ایمیل"
            className="rounded-md border p-2 shadow-sm"
            name="email"
            />
            <input 
            type="password"
            placeholder="رمز عبور"
            className="rounded-md border p-2 shadow-sm"
            name="password"
            />
            <SubmitButton />
        </form>
    );
}

export default RegisterForm;