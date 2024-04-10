"use client";

import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { emailRegex } from "@/variable/sharedVariable";

export default function Profile() {
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

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-1">
                <span className="text-lg font-medium">Tài khoản</span>
                <span className="text-sm text-muted-foreground">Tùy chỉnh thông tin tài khoản của bạn</span>
            </div>
            <Separator className="w-full my-6" />
        </div>
    );
}
