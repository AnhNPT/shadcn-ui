"use client";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";
import { HamburgerMenuIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useHeaderContext } from "@/context/headerContext";
import { ListItem } from "../listItem";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"

export default function LeftHeader() {
    const { state, setState } = useHeaderContext();
    const headerItems = [
        {
            id: "Test 1",
            href: "/",
            title: "Lorem ispun",
        },
        {
            id: "Test 2",
            href: "/",
            title: "Lorem ispun",
        },
        {
            id: "Test 3",
            href: "/",
            title: "Lorem ispun",
        },
        {
            id: "Test 4",
            href: "/",
            title: "Lorem ispun",
        },
        {
            id: "Test 5",
            href: "/",
            title: "Lorem ispun",
        },
    ];

    return (
        <div className="flex items-center sm:gap-6 gap-0">
            <Drawer direction="left">
                <DrawerTrigger className="mr-3 md:hidden flex">
                    <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
                </DrawerTrigger>
                <DrawerContent>some draw</DrawerContent>
            </Drawer>
            <Link className="flex items-center space-x-2" href="/">
                <span className="font-bold ">Testing</span>
            </Link>
            <nav className="md:flex hidden items-center gap-4 lg:ml-4 text-sm lg:gap-6">
                <div className="transition-colors hover:text-foreground/100 text-foreground/80">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex gap items-center">
                            Thể loại
                            <ChevronDownIcon className="h-4 w-4 ml-2" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="grid w-[300px] max-h-44 overflow-y-auto gap-3 p-4 md:w-[500px] md:grid-cols-2">
                            {
                                headerItems.map((item) => (
                                    <DropdownMenuItem key={item.id}>
                                        <Link href={item.href}>{item.title}</Link>
                                    </DropdownMenuItem>
                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Link className="transition-colors hover:text-foreground/100 text-foreground/80" href="#">
                    Tìm kiếm nâng cao
                </Link>
                <Link className="transition-colors hover:text-foreground/100 text-foreground/80" href="#">
                    Lịch sử
                </Link>
            </nav >
        </div >
    );
}
