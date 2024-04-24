// import { HeaderProvider } from "@/context/headerContext";
import LeftHeader from "./leftHeader";
import RightHeader from "./rightHeader";

export default function Header() {
    return (
        // <HeaderProvider>
        <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur ">
            <div className="container flex justify-between gap-4 min-h-14 max-w-screen-2xl items-center">
                <LeftHeader />
                <RightHeader />
            </div>
        </div>
        //  </HeaderProvider> 
    );
}
