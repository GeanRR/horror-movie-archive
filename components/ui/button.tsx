import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
 "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent font-sans text-sm font-black transition-all duration-[220ms] ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--archive-yellow)]/45 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
 {
 variants: {
 variant: {
 default:
 "bg-[var(--archive-yellow)] text-black hover:bg-[var(--archive-yellow-hover)]",
 destructive:
 "bg-[var(--archive-burgundy-bright)] text-[var(--archive-off-white)] hover:bg-[#a31358]",
 outline:
 "border-0 bg-[#0d0d0d] text-[var(--archive-off-white)] hover:bg-[#161616] hover:text-[var(--archive-off-white)]",
 secondary:
 "border-0 bg-[#0d0d0d] text-[var(--archive-off-white)] hover:bg-[#161616] hover:text-[var(--archive-off-white)]",
 ghost: "border-0 bg-transparent text-[var(--archive-off-white)] hover:bg-[var(--archive-off-white)]/10 hover:text-[var(--archive-off-white)]",
 link: "h-auto rounded-none border-0 bg-transparent px-0 py-0 text-[var(--archive-yellow)] underline-offset-4 hover:underline",
 },
 size: {
 default: "h-11 px-5 py-2.5",
 sm: "h-10 px-4 text-xs",
 lg: "h-12 px-8 text-base",
 icon: "h-11 w-11 p-0",
 },
 },
 defaultVariants: {
 variant: "default",
 size: "default",
 },
 }
);

export interface ButtonProps
 extends React.ButtonHTMLAttributes<HTMLButtonElement>,
 VariantProps<typeof buttonVariants> {
 asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, variant, size, asChild = false, ...props }, ref) => {
 const Comp = asChild ? Slot : "button";
 return (
 <Comp
 className={cn(buttonVariants({ variant, size, className }))}
 ref={ref}
 {...props}
 />
 );
 }
);
Button.displayName = "Button";

export { Button, buttonVariants };
