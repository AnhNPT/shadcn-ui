import LeftHeader from "./leftHeader";
import RightHeader from "./rightHeader";

export default function Header() {
    return (
        <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex justify-between h-14 max-w-screen-2xl items-center">
                <LeftHeader />
                <RightHeader />
            </div>
        </div>
    );
}