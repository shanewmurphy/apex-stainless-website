import Image from "next/image";
import Logo from "@/public/Logo-Page.svg";
import Diageo from "@/public/pharma-logos/Diageo.svg";
import Kerry from "@/public/pharma-logos/Kerry.svg";
import Lilly from "@/public/pharma-logos/Lilly.svg";
import Pfizer from "@/public/pharma-logos/Pfizer.svg";

const logos = [
  { name: "Diageo", src: Diageo, className: "h-6 md:h-8 max-h-[3.4vh]" },
  { name: "Kerry", src: Kerry, className: "h-10 md:h-12 max-h-[7vh]" },
  { name: "Lilly", src: Lilly, className: "h-10 md:h-12 max-h-[7vh]" },
  { name: "Pfizer", src: Pfizer, className: "h-10 md:h-12 max-h-[7vh]" },
];

export default function IntroText() {
  return (
    <div className="h-screen w-full bg-black flex flex-col">
      <div className="flex h-[85vh] w-full bg-gray-background gap-8 px-24 items-center rounded-b-[5vw]">
        <div className="w-[25vw]">
          <div className="flex items-center justify-center">
            <Image
              className="w-[140px] h-[140px]"
              src={Logo}
              alt="Apex Stainless Logo"
              priority
            />
          </div>
        </div>
        <div className="w-[60vw] text-txtheadinggray">
          <h1 className="font-semibold lg:text-2xl text-txtheadinggray">
            Leading supplier of Stainless Steel Process Vessels, Silos, Process
            Systems for the Food, Dairy, Beverage & Pharmaceutical Industries
          </h1>
          <p className="text-gray-600 text-sm font-medium mt-2">
            We craft, polish, and validate exceptional Stainless Steel Process
            Vessels, Outdoor Silos, Double-walled Process Skid systems. Our
            machinery complies strictly with the criteria of ASME BPE, 3-A
            Sanitary Guidelines, and EHEDG Type-EL class-1 procedures for the
            food, dairy, chemical logistics, and global pharmaceutical
            industries.
          </p>
        </div>
      </div>
      <div className="bg-[#d9d9d9] h-[15vh] w-full rounded-[3vw] flex items-center justify-around px-8 md:px-16 lg:px-24">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              className={`w-auto object-contain ${logo.className}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
