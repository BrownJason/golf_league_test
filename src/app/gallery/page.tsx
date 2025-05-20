/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";
import { GetImages } from "@/lib/getImages";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Page() {
  // Replace below with api call of images saved to a database once we have it setup for use
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false, stopOnLastSnap: false })
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

  // State for expanded dialog
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  // Handlers for dialog navigation
  const handleOpen = (idx: number) => setExpandedIdx(idx);
  const handleClose = () => setExpandedIdx(null);
  const handlePrev = () => setExpandedIdx((idx) => (idx !== null ? (idx - 1 + images.length) % images.length : null));
  const handleNext = () => setExpandedIdx((idx) => (idx !== null ? (idx + 1) % images.length : null));

  return (
    <div className="p-4 md:p-6">
      <main className="max-w-full mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#EDE6D6] mb-4 text-shadow-lg text-shadow-black">Gallery</h1>
          <div className="flex flex-col justify-center md:w-1/2 mx-auto bg-[#292929] border border-[#B2825E] border-4 rounded-xl">
            <Carousel  
                plugins={[plugin.current]}
                className="flex bg-[#292929] rounded-xl"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                setApi={setApi}>
                <CarouselContent>
                {images.map((img: any, idx: number) => {
                    return (
                    <CarouselItem key={img.src + idx} className="w-[1960px]">
                        <AspectRatio ratio={16/9}>
                            <Image src={img.src} alt="bg img" fill unoptimized className="flex aspect-square items-center justify-center p-6 cursor-pointer" onClick={() => handleOpen(idx)} title={img.title + ': ' + img.description}/>  
                        </AspectRatio>
                        <div className="font-bold text-center w-full truncate" title={img.title}>{img.title}</div>
                        <div className="text-center w-full truncate" title={img.description}>{img.description}</div>
                    </CarouselItem>
                    );
                })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel> 
            <div className="py-2 text-center text-lg text-[#EDE6D6]">
                Slide {current} of {count}
            </div>
          </div>
        </div>
        {/* Thumbnails under the carousel */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {images.map((img: any, idx: number) => (
            <div
              key={img.src + idx}
              className={`relative border-2 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${current - 1 === idx ? 'border-[#B2825E] scale-105' : 'border-transparent'}`}
              style={{ width: 80, height: 45, background: '#222' }}
              onClick={() => {
                if (api) api.scrollTo(idx);
              }}
            >
              <Image
                src={img.src}
                alt={img.title || 'thumbnail'}
                width={80}
                height={45}
                className="object-cover w-full h-full"
                unoptimized
              />
              {/* Hover overlay for title and description */}
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 flex flex-col items-center justify-center text-xs text-[#EDE6D6] p-2 transition-opacity duration-200 z-10">
                <div className="font-bold text-center w-full truncate" title={img.title}>{img.title}</div>
                <div className="text-center w-full truncate" title={img.description}>{img.description}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Expanded Dialog for images */}
        {expandedIdx !== null && (
          <Dialog open onOpenChange={handleClose}>
            <DialogContent className="flex flex-col !max-w-[90vw] !max-h-[90vh] bg-[#292929] border border-[#B2825E] overflow-auto">
              <DialogHeader>
                <DialogTitle className="text-[#EDE6D6]">{images[expandedIdx].title}</DialogTitle>
                <DialogDescription className="text-[#EDE6D6]">
                  {images[expandedIdx].description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center items-center w-full h-full">
                <Image
                  src={images[expandedIdx].src}
                  alt="bg img"
                  style={{ maxWidth: "85vw", maxHeight: "70vh", width: "auto", height: "auto" }}
                  className="rounded-lg object-contain"
                  unoptimized
                  fill={false}
                  width={1200}
                  height={675}
                />
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={handlePrev}>
                  Previous
                </Button>
                <Button variant="outline" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  );
}