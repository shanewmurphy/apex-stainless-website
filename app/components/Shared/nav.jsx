import * as React from "react";
import { AnimatedLink } from "@/components/ui/animated-link";
import Image from "next/image";
import NavLogo from "@/public/Nav-Logo.svg";
const Nav = React.forwardRef((props, ref) => {
  return (
    <nav
      ref={ref}
      className="absolute bg-white text-zinc-900 w-[80vw] h-10 rounded-4xl mx-auto top-10 left-0 right-0 z-30 flex items-center justify-between px-8 py-7 shadow-md/5"
    >
      {/* Brand Name / Logo Text */}
      <div className="flex items-center gap-2">
        <Image src={NavLogo} alt="Apex Stainless Logo" width={40} height={40} />
        <span className="text-sm font-bold uppercase tracking-wider text-zinc-700">
          Apex Stainless
        </span>
      </div>

      {/* Navigation links using our AnimatedLink component */}
      <div className="flex items-center text-zinc-800 gap-6 md:gap-10 text-xs md:text-sm font-semibold tracking-wide">
        <AnimatedLink href="#services" variant="left">
          Services
        </AnimatedLink>
        <AnimatedLink href="#products" variant="left">
          Products
        </AnimatedLink>
        <AnimatedLink href="#about" variant="left">
          About Us
        </AnimatedLink>
        <AnimatedLink href="#contact" variant="left">
          Contact
        </AnimatedLink>
      </div>
      <div>KKK</div>
    </nav>
  );
});

Nav.displayName = "Nav";

export default Nav;
