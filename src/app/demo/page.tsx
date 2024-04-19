"use client";

import SButtonPopup from "@/components/reactComponents/ButtonPopup/SButtonPopup";
import SToolTips from "@/components/reactComponents/Tooltips/SToolTips";
import React from "react";

const Demo = () => {
    return (
        <div>
            {/* SButtonPopup */}
            <SButtonPopup
                buttonLayout={<button>Click me</button>}
                position="bottom" // Vị trí của popup
                wrapperProps={{ className: "abc" }}>
                {() => (
                    // Nội dung của popup
                    <div style={{ padding: "10px", backgroundColor: "lightblue" }}>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt assumenda vero ab quis cumque alias accusamus. Quia rem, dignissimos possimus mollitia, laboriosam similique laudantium ex, voluptate voluptas modi soluta! Non?</span>
                    </div>
                )}
            </SButtonPopup>
            {/* STooltips */}
            <div className="flex mt-10">
                <SToolTips position="bottom" label={<span className="bg-zinc-600">abavavsa</span>}>
                    <span>Hover me</span>
                </SToolTips>
            </div>
        </div>
    );
};

export default Demo;
