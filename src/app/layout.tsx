import { Inter } from "next/font/google";
import "../../public/styles/globals.scss";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/themeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + " antialiased"}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                    <SpeedInsights />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
