/* eslint-disable @next/next/no-img-element */
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Appearance() {
    const { theme, setTheme } = useTheme();
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-1">
                <span className="text-lg font-medium">Giao diện</span>
                <span className="text-sm text-muted-foreground">Tùy chỉnh giao diện của trang web.</span>
            </div>
            <Separator className="w-full my-6" />
            <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex flex-col gap-1" onClick={() => setTheme("light")}>
                        <div className={`flex flex-col ${theme === "light" && "border-2 rounded-sm border-black"}`}>
                            <img src="/images/illusts/lightmode.svg" alt="" />
                        </div>
                        <span className="block w-full p-2 text-center font-normal">Sáng</span>
                    </div>
                    <div className="flex flex-col gap-1" onClick={() => setTheme("dark")}>
                        <div className={`relative flex flex-col sm:w-52 sm:h-36 ${theme === "dark" && "border-2 rounded-sm border-black"}`}>
                            <img src="/images/illusts/darkmode.svg" alt="" />
                        </div>
                        <span className="block w-full p-2 text-center font-normal">Tối</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
