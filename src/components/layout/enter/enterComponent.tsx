"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { emailRegex } from "@/variable/sharedVariable";

export default function EnterComponent() {
    const [loading, setLoading] = useState<boolean>(false);
    const [showHidePassword, setShowHidePassword] = useState<boolean>(false);
    const formSchema = z.object({
        email: z
            .string()
            .min(1, {
                message: "Email không được để trống",
            })
            .max(50, { message: "Email không dài quá 50 kí tự" })
            .regex(emailRegex, {
                message: "Email không đúng định dạng",
            }),
        password: z.string().min(1, {
            message: "Mật khẩu không được để trống",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/2 lg:block hidden relative ">
                <Image src="/images/illusts/001.jpg" style={{ objectFit: "cover" }} fill alt=""></Image>
            </div>
            <div className="lg:w-1/2 gap-6 w-full flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold tracking-tight">Đăng nhập tài khoản</span>
                <Form {...form}>
                    <form className="lg:w-1/2 w-3/4 flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            disabled={loading === true}
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>
                        <FormField
                            disabled={loading === true}
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input autoComplete="true" type={showHidePassword ? "text" : "password"} placeholder="Nhập mật khẩu" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Checkbox id="showPassword" onClick={() => setShowHidePassword(!showHidePassword)} />
                                <label htmlFor="showPassword" className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Hiển thị mật khẩu
                                </label>
                            </div>
                            <Link className="text-sm font-medium leading-none underline underline-offset-4 hover:text-primary" href="/forgot">
                                Quên mật khẩu?
                            </Link>
                        </div>
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
                <Separator className="lg:w-1/2 w-3/4" />
                <span className="text-sm font-medium leading-none hover:text-primary">
                    Bạn là người mới?{" "}
                    <Link className="underline underline-offset-4" href="/create">
                        Đăng ký ngay
                    </Link>
                </span>
            </div>
        </div>
    );
}
