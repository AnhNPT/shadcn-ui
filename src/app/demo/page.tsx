"use client";

import React from "react";
import SButtonPopup from "@/components/reactComponents/SButtonPopup";
const Demo = () => {
    return (
        <div>
            {/* SButton */}
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
        </div>
    );
};

export default Demo;
