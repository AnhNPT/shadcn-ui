"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

export default function Signin() {
    const [loading, setLoading] = useState<boolean>(false);
    const formSchema = z.object({
        username: z
            .string()
            .min(1, {
                message: "Tên tài khoản không được để trống",
            })
            .max(50),
        password: z.string().min(1, {
            message: "Mật khẩu không được để trống",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-zinc-900"></div>
            <div className="w-1/2 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold tracking-tight">Account Login</span>
                <Form {...form}>
                    <form className="w-1/2 flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên tài khoản</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập tên tài khoản" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Nhập mật khẩu" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>
                        <Button disabled={loading} type="submit">
                            {loading ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Vui lòng chờ
                                </>
                            ) : (
                                "Đăng nhập"
                            )}
                        </Button>
                    </form>
                </Form>
                <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our <br />
                    <Link className="underline underline-offset-4 hover:text-primary" href="/terms">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link className="underline underline-offset-4 hover:text-primary" href="/privacy">
                        {" "}
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
}
