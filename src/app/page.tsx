import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import RecentlyUpdate from "@/components/layout/home/recentlyUpdate";
import SliderTop from "@/components/layout/home/sliderTop";

export default function Home() {
    return (
        <>
            <Header />
            <SliderTop />
            <RecentlyUpdate />
            <Footer/>
        </>
    );
}
