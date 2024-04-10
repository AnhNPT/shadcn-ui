"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";
import { CommandDialog, CommandInput, CommandList } from "@/components/ui/command";

export default function RightHeader() {
    const [login, setLogin] = useState<boolean>(true);
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const { setTheme } = useTheme();

    return (
        <div className="flex sm:gap-4 gap-2 items-center">
            <Button onClick={() => setOpenSearch(true)} variant="outline" size="icon">
                <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
                <CommandInput className="opacity-100" placeholder="Nhập từ khóa tìm kiếm" />
                <CommandList></CommandList>
            </CommandDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
                        Sáng
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
                        Tối
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("system")}>
                        Theo hệ thống
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {login ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer" asChild>
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="">Thông tin tài khoản</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="">Lịch sử</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="/settings">Thiết lập</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Đăng xuất</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button asChild variant="ghost">
                    <Link href="/enter">Đăng nhập</Link>
                </Button>
            )}
        </div>
    );
}
