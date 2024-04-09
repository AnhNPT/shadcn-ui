"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { emailRegex } from "@/variable/sharedVariable";

export default function ForgotComponent() {
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
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
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleSendEmail = (email: string) => {
        toast({
            title: "Khôi phục mật khẩu thành công",
            description: (
                <>
                    Mật khẩu mới đã được gửi về email: {email}
                    <br />
                    Hãy kiểm tra hộp thư đến hoặc spam
                </>
            ),
        });
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (values) {
            handleSendEmail(values.email);
        }
        console.log(values);
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/2 lg:block hidden relative ">
                <Image priority src="/images/illusts/001.jpg" style={{ objectFit: "cover" }} fill alt=""></Image>
            </div>
            <div className="lg:w-1/2 gap-6 w-full flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold tracking-tight">Quên mật khẩu</span>
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

                        <Button disabled={loading} type="submit">
                            {loading ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Vui lòng chờ
                                </>
                            ) : (
                                "Xác nhận"
                            )}
                        </Button>
                    </form>
                </Form>
                <Separator className="lg:w-1/2 w-3/4" />
                <span className="text-sm font-medium leading-none hover:text-primary">
                    Bạn đã có tài khoản?{" "}
                    <Link className="underline underline-offset-4" href="/enter">
                        Đăng nhập ngay
                    </Link>
                </span>
            </div>
        </div>
    );
}
