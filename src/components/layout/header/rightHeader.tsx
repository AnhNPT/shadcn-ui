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
