import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";

type AnimatedLinkVariant = "left" | "right" | "center";

const underlineVariants: Record<AnimatedLinkVariant, string> = {
  // Underline wipes in from the left edge (collapses to the right when unhovered)
  left: "before:origin-right before:scale-x-0 hover:before:origin-left hover:before:scale-x-100",
  // Underline wipes in from the right edge (collapses to the left when unhovered)
  right: "before:origin-left before:scale-x-0 hover:before:origin-right hover:before:scale-x-100",
  // Underline grows outward from the center
  center: "before:origin-center before:scale-x-0 hover:before:scale-x-100",
};

export interface AnimatedLinkProps
  extends Omit<React.ComponentPropsWithoutRef<"a">, "href">,
    Omit<LinkProps, "as"> {
  /** Direction the underline reveals from on hover. */
  variant?: AnimatedLinkVariant;
}

const AnimatedLink = React.forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  (
    {
      variant = "left",
      className,
      children,
      href,
      prefetch,
      replace,
      scroll,
      shallow,
      passHref,
      ...props
    },
    ref,
  ) => {
    return (
      <Link
        href={href}
        ref={ref}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
        className={cn(
          "group relative inline-flex w-fit items-center text-current transition-colors duration-200",
          // Base pseudo-element styling for the underline
          "before:pointer-events-none before:absolute before:left-0 before:top-[1.3em] before:h-[0.06em] before:w-full before:bg-current before:content-['']",
          // Smooth transition for scale-x
          "before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:before:transition-none",
          underlineVariants[variant],
          className,
        )}
        {...props}
      >
        <span>{children}</span>
      </Link>
    );
  },
);

AnimatedLink.displayName = "AnimatedLink";

export { AnimatedLink };
export default AnimatedLink;
