"use client";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function LeftHeader() {
    const headerItems = [
        {
            title: "Test 1",
            href: "/",
            description: "Lorem ispun",
        },
        {
            title: "Test 2",
            href: "/",
            description: "Lorem ispun",
        },
        {
            title: "Test 3",
            href: "/",
            description: "Lorem ispun",
        },
        {
            title: "Test 4",
            href: "/",
            description: "Lorem ispun",
        },
        {
            title: "Test 5",
            href: "/",
            description: "Lorem ispun",
        },
    ];

    return (
        <div className="flex items-center sm:gap-2 gap-0">
            <Button className="flex justify-center items-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" variant="ghost" size="icon">
                <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <Link className="flex items-center space-x-2" href="/">
                <span className="font-bold ">Testing</span>
            </Link>
            <nav className="md:flex hidden items-center gap-4 lg:ml-4 text-sm lg:gap-6">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="#" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle() + " transition-colors hover:text-foreground/80 text-foreground/60"}>Documentation</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="transition-colors hover:text-foreground/80 text-foreground/60">Components</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[300px] max-h-44 overflow-y-auto gap-3 p-4 md:w-[500px] md:grid-cols-2">
                                    {headerItems.map((item) => (
                                        <ListItem key={item.title} title={item.title} href={item.href}>
                                            {item.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
        </div>
    );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a ref={ref} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props}>
                    <div className="text-sm font-medium leading-none">{title}</div>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
