/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";
import { GetImages } from "@/lib/getImages";

export default function Page() {
  // Replace below with api call of images saved to a database once we have it setup for use
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false, stopOnLastSnap: false })
  )

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const images = GetImages();

  return (
    <div className="p-4 md:p-6">
      <main className="mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#9A9540] mb-4 text-shadow-lg text-shadow-black">Gallery</h1>
          <div className="flex flex-col justify-center md:w-1/2 mx-auto bg-[#243E2A] border border-[#9A9540] border-4">
            <Carousel  
                plugins={[plugin.current]}
                className="flex bg-[#243E2A]"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                setApi={setApi}>
                <CarouselContent>
                {images.map((img: any) => {
                    console.log(img)
                    return (
                    <CarouselItem key={img} className="w-[1960px]">
                        <AspectRatio ratio={16/9}>
                            <Image src={img} alt="bg img" fill unoptimized className="flex aspect-square items-center justify-center p-6" />  
                        </AspectRatio>
                    </CarouselItem>
                    );
                })}
                </CarouselContent>
            </Carousel> 
            <div className="py-2 text-center text-lg text-[#9A9540]">
                Slide {current} of {count}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}