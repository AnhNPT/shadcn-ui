import { Separator } from "@radix-ui/react-separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function Appearance() {
    const { setTheme } = useTheme();
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-1">
                <span className="text-lg font-medium">Giao diện</span>
                <span className="text-sm text-muted-foreground">Tùy chỉnh giao diện của trang web. Tự động chuyển đổi giữa các chủ đề ngày và đêm.</span>
            </div>
            <Separator className="w-full my-6" />

            <div className="flex flex-col gap-8 w-full"></div>
        </div>
    );
}
