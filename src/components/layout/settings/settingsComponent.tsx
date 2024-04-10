"use client";

import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SideSettingEnum } from "@/enum/enum";
import Profile from "./profile";
import Appearance from "./apperance";
import Notification from "./notification";

const SettingsComponent = () => {
    const SideSetting = [
        {
            id: 0,
            name: SideSettingEnum.PROFILE,
        },
        {
            id: 1,
            name: SideSettingEnum.APPEARANCE,
        },
        {
            id: 2,
            name: SideSettingEnum.NOTIFICATION,
        },
    ];

    const [menuSetting, setMenuSetting] = useState<string>(SideSettingEnum.PROFILE);

    const showSettingContent = () => {
        switch (menuSetting) {
            case SideSettingEnum.PROFILE:
                return <Profile />;
            case SideSettingEnum.APPEARANCE:
                return <Appearance />;
            case SideSettingEnum.NOTIFICATION:
                return <Notification />;
            default:
                break;
        }
    };

    return (
        <div className="container max-w-screen-2xl p-10 pb-16">
            <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold tracking-tight">Thiết lập</span>
                <span className="text-muted-foreground">Chỉnh sửa tài khoản của bạn và các thiết lập ở trên trang</span>
            </div>
            <Separator className="w-full my-6" />
            <div className="flex w-full gap-4">
                <div className="flex flex-col gap-2 min-w-[20%]">
                    {SideSetting.map((item) => (
                        <Button onClick={() => setMenuSetting(item.name)} key={item.id} className={`justify-start ${menuSetting === item.name && "hover:bg-muted bg-muted hover:no-underline"}`} variant="link">
                            {item.name}
                        </Button>
                    ))}
                </div>
                <div className="w-full">{showSettingContent()}</div>
            </div>
        </div>
    );
};

export default SettingsComponent;
