"use client";

import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { emailRegex } from "@/variable/sharedVariable";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function ChangePassword() {
    const [loading, setLoading] = useState<boolean>(false);
    const formSchema = z
        .object({
            oldPassword: z.string().min(1, {
                message: "Mật khẩu không được để trống",
            }),
            newPassword: z.string().min(8, {
                message: "Mật khẩu không được dưới 8 ký tự hoặc để trống",
            }),
            reTypePassword: z.string().min(8, {
                message: "Mật khẩu không được dưới 8 ký tự hoặc để trống",
            }),
        })
        .refine((data: { oldPassword: string; newPassword: string }) => data.oldPassword !== data.newPassword, {
            message: "Mật khẩu mới phải khác mật khẩu cũ",
            path: ["newPassword"],
        })
        .refine((data: { newPassword: string; reTypePassword: string }) => data.newPassword === data.reTypePassword, {
            message: "Mật khẩu và mật khẩu nhập lại không khớp",
            path: ["reTypePassword"],
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            reTypePassword: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-1">
                <span className="text-lg font-medium">Đổi mật khẩu</span>
                <span className="text-sm text-muted-foreground">Cập nhật mật khẩu của bạn</span>
            </div>
            <Separator className="w-full my-6" />
            <Form {...form}>
                <form className="flex flex-col gap-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        disabled={loading === true}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu cũ</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập mật khẩu cũ" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}></FormField>
                    <FormField
                        control={form.control}
                        name="newPassword"
                        disabled={loading === true}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu mới</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập mật khẩu mới" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}></FormField>
                    <FormField
                        control={form.control}
                        name="reTypePassword"
                        disabled={loading === true}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập lại mật khẩu mới" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}></FormField>
                    <Button disabled={loading} className="w-fit" type="submit">
                        {loading ? (
                            <>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Vui lòng chờ
                            </>
                        ) : (
                            "Cập nhật thông tin"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
