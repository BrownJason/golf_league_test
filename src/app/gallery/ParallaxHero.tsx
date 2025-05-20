import Image from "next/image";
import bg_image from "../../../public/uploads/hole_9_img1.jpg";
import BrownFamilyLogo from "@/components/ui/BrownFamilyLogo";

export default function ParallaxHero() {
  return (
    <div className="relative h-[95vh] md:h-[95vh] w-full overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-opacity-0 flex flex-col items-center justify-center h-full w-full">
            <Image
                src={bg_image}
                alt="Brown Family Golf Gallery Hero"
                fill
                priority
                className="object-cover object-center w-full h-full select-none pointer-events-none"
                style={{ zIndex: -1, opacity: 0.85}}
            />
        <BrownFamilyLogo />
            <p className="text-lg md:text-2xl text-[#EDE6D6] mt-4 text-center max-w-2xl mx-auto">
            Relive the best moments from our league. Scroll down to explore the gallery!
            </p>
        </div>
    </div>
  );
}
