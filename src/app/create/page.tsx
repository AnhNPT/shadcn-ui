import CreateComponent from "@/components/layout/create/createComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng ký",
};

export default function Create() {
    return <CreateComponent />;
}
