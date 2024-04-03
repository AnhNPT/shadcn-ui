"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";

export default function RightHeader() {
    const [login, setLogin] = useState<boolean>(false);
    const { setTheme } = useTheme();

    return (
        <div className="flex gap-4 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>Sáng</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>Tối</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>Theo hệ thống</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild variant="ghost">
                <Link href="/signin">Đăng nhập/ Tạo tài khoản</Link>
            </Button>
            {login && (
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer" asChild>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Thông tin</DropdownMenuItem>
                        <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
}
