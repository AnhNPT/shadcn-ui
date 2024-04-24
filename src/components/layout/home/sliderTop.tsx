import React from 'react';
import { CarouselItem, CarouselContent, Carousel } from "@/components/ui/carousel"
import Link from 'next/link';
import Image from 'next/image';

const SliderTop = () => {
    return (
        <div className="relative w-full">
            <Carousel className="w-full" opts={{
                loop: true,
            }}>
                <CarouselContent>
                    <CarouselItem>
                        <div className="relative sm:h-[500px] h-[300px] w-full overflow-hidden">
                            <Image
                                alt=""
                                className="absolute inset-0 object-cover"
                                fill
                                priority
                                src="/images/illusts/001.jpg"
                            />
                            <div className="absolute inset-0 flex flex-col items-start justify-center gap-6 bg-gray-900/50 p-4 text-white md:p-8 md:pl-11">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                        Unleash Your Creativity
                                    </h2>
                                    <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed">
                                        Discover the ultimate platform for bringing your ideas to life. Unlock a world of endless
                                        possibilities.
                                    </p>
                                </div>
                                <Link
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-50 px-6 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800"
                                    href="#"
                                >
                                    Button here
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="relative sm:h-[500px] h-[300px] w-full overflow-hidden">
                            <Image
                                alt=""
                                className="absolute inset-0 object-cover"
                                fill
                                priority
                                src="/images/illusts/001.jpg"
                            />
                            <div className="absolute inset-0 flex flex-col items-start justify-center gap-6 bg-gray-900/50 p-4 text-white md:p-8 md:pl-11">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                        Unleash Your Creativity
                                    </h2>
                                    <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed">
                                        Discover the ultimate platform for bringing your ideas to life. Unlock a world of endless
                                        possibilities.
                                    </p>
                                </div>
                                <Link
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-50 px-6 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800"
                                    href="#"
                                >
                                    Button here
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default SliderTop;
