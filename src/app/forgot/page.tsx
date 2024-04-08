import ForgotComponent from "@/components/layout/forgot/forgotComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quên mật khẩu",
};

export default function Forgot() {
    return (
        <>
            <ForgotComponent />
        </>
    );
}
