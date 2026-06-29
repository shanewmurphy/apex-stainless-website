import * as React from "react";
import { AnimatedLink } from "@/components/ui/animated-link";

const Nav = React.forwardRef((props, ref) => {
  return (
    <nav
      ref={ref}
      className="absolute bg-white text-zinc-900 w-[80vw] h-10 rounded-4xl mx-auto top-10 left-0 right-0 z-30 flex items-center justify-between px-2 py-2 md:px-20 md:py-8 shadow-md/5"
    >
      {/* Brand Name / Logo Text */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold uppercase tracking-wider text-zinc-900">
          Apex Stainless
        </span>
      </div>

      {/* Navigation links using our AnimatedLink component */}
      <div className="flex items-center gap-6 md:gap-10 text-xs md:text-sm font-semibold tracking-wide">
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
