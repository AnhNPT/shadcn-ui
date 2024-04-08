"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MagnifyingGlassIcon, CalendarIcon, EnvelopeClosedIcon, FaceIcon, GearIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

export default function RightHeader() {
    const [login, setLogin] = useState<boolean>(false);
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
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Thông tin</DropdownMenuItem>
                        <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button asChild variant="ghost">
                    <Link className="" href="/enter">
                        Đăng nhập
                    </Link>
                </Button>
            )}
        </div>
    );
}
