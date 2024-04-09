import Header from "@/components/layout/header/header";
import SettingsComponent from "@/components/layout/settings/settingsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thiết lập",
};

export default function Settings() {
    return (
        <>
            <Header />
            <SettingsComponent />
        </>
    );
}
