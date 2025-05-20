import Image from "next/image";
import bg_image from "../../../public/uploads/hole_9_img1.jpg";

export default function ParallaxHero() {
  return (
    <div className="relative h-[95vh] w-full overflow-hidden">
      <Image
        src={bg_image}
        alt="Brown Family Golf Gallery Hero"
        fill
        priority
        className="object-cover object-center w-full h-full select-none pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center h-full w-full z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-[#EDE6D6] drop-shadow-lg text-center mt-20 md:mt-32">
          Brown Family Golf Gallery
        </h1>
        <p className="text-lg md:text-2xl text-[#EDE6D6] mt-4 text-center max-w-2xl mx-auto">
          Relive the best moments from our league. Scroll down to explore the gallery!
        </p>
      </div>
    </div>
  );
}
