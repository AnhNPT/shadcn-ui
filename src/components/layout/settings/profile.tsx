"use client";

import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { avatarImageSize, emailRegex } from "@/variable/sharedVariable";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IAvatarError {
    sizeError: boolean;
    noImgError: boolean;
}

export default function Profile() {
    const [imageFile, saveImageFile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [imageErrors, setImageErrors] = useState<IAvatarError>({
        sizeError: false,
        noImgError: false,
    });
    const formSchema = z.object({
        avatar: z.any().optional(),
        username: z
            .string()
            .min(1, {
                message: "Username không được để trống",
            })
            .max(50, { message: "Tên người dùng không dài quá 50 ký tự" }),
        email: z
            .string()
            .min(1, {
                message: "Email không được để trống",
            })
            .max(50, { message: "Email không dài quá 50 kí tự" })
            .regex(emailRegex, {
                message: "Email không đúng định dạng",
            }),
        biography: z.string().max(500, { message: "Thông tin không dài quá 500 ký tự" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            avatar: undefined,
            username: "anhnpt",
            email: "dummy@gmail.com",
            biography: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    const imageUploader = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if (!e.target || !target.files || target.files.length === 0) {
            setImageErrors((prevState) => ({
                ...prevState,
                noImgError: true,
            }));
            return;
        }

        const avatarFile = target.files[0];
        const fileSizeInMB = avatarFile.size / (1024 * 1024);

        if (fileSizeInMB > avatarImageSize) {
            setImageErrors((prevState) => ({
                ...prevState,
                sizeError: true,
            }));
            return;
        }

        saveImageFile({
            preview: URL.createObjectURL(avatarFile),
            data: avatarFile,
        });

        setImageErrors({
            sizeError: false,
            noImgError: false,
        });
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-1">
                <span className="text-lg font-medium">Tài khoản</span>
                <span className="text-sm text-muted-foreground">Tùy chỉnh thông tin tài khoản của bạn</span>
            </div>
            <Separator className="w-full my-6" />
            <Form {...form}>
                <form className="flex flex-col gap-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="avatar"
                        disabled={loading === true}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ảnh đại diện</FormLabel>
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-14 h-14">
                                        <AvatarImage src={imageFile?.preview} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className=""
                                            accept="image/png, image/gif, image/jpeg"
                                            type="file"
                                            onChange={(e) => {
                                                imageUploader(e);
                                            }}
                                        />
                                    </FormControl>
                                </div>
                                {imageErrors.sizeError && <span className="text-[0.8rem] mt-2 font-medium text-destructive">Ảnh tải lên không được vượt quá 2MB</span>}
                            </FormItem>
                        )}></FormField>
                    <FormField
                        control={form.control}
                        name="username"
                        disabled={loading === true}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên người dùng</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập tên người dùng" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}></FormField>
                    <FormField
                        control={form.control}
                        name="email"
                        disabled={loading === true}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}></FormField>
                    <FormField
                        control={form.control}
                        name="biography"
                        disabled={loading === true}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thông tin</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Nhập thông tin" {...field} />
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
