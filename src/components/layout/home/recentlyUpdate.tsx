import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecentlyUpdate = () => {
    const recentUpdate = [
        {
            id: 0,
            img: "/images/illusts/001.jpg",
            name: "Lorem sa dfas ef asdf sadf wse fweq fsdv asdf sdf asdf asdf asdf sad f",
            description: "Lorem ispun",
        },
        {
            id: 1,
            img: "/images/illusts/001.jpg",
            name: "Lorem ispun",
            description: "Lorem ispun",
        },
        {
            id: 2,
            img: "/images/illusts/001.jpg",
            name: "Lorem ispun",
            description: "Lorem ispun",
        },
        {
            id: 3,
            img: "/images/illusts/001.jpg",
            name: "Lorem ispun",
            description: "Lorem ispun",
        },
        {
            id: 4,
            img: "/images/illusts/001.jpg",
            name: "Lorem ispun",
            description: "Lorem ispun",
        },
        {
            id: 5,
            img: "/images/illusts/001.jpg",
            name: "Lorem ispun",
            description: "Lorem ispun",
        },
        {
            id: 6,
            img: "/images/illusts/001.jpg",
            name: "Lorem ispun",
            description: "Lorem ispun",
        },
        {
            id: 7,
            img: "/images/illusts/001.jpg",
            name: "Lorem ispun",
            description: "Lorem ispun",
        },
        {
            id: 8,
            img: "/images/illusts/001.jpg",
            name: "Lorem ispun",
            description: "Lorem ispun",
        },
    ];

    return (
        <div className="container mt-8">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold tracking-tight">Mới cập nhật</h2>
                <span className="text-sm text-muted-foreground">Lorem ispun</span>
            </div>
            <div className="grid-items mt-4">
                {recentUpdate.map((item) => (
                    <Link href="" key={item.id} className="flex flex-col gap-2">
                        <div className="relative w-full h-60" >
                            <Image src={item.img} layout="fill" objectFit="cover" alt=""></Image>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-medium leading-none truncate two-rows">{item.name}</span>
                            <span className="text-xs text-muted-foreground truncate one-row">{item.description}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecentlyUpdate;

