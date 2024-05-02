"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { CommandDialog, CommandInput, CommandList } from "@/components/ui/command";

export default function RightHeader() {
    const [login, setLogin] = useState<boolean>(true);
    const [openSearch, setOpenSearch] = useState<boolean>(false);

    return (
        <div className="flex md:flex-initial flex-1 sm:gap-3 gap-2 items-center">
            <Button className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-52 lg:w-64 w-full" onClick={() => setOpenSearch(true)} variant="ghost" size="default">
                <span className="inline-flex">Tìm kiếm...</span>
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
