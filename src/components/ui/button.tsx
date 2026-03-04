import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Since I didn't install class-variance-authority or radix-slot yet, I should probably stick to simple props or install them.
// The plan didn't explicitly mention CVA/Radix, but it's standard for premium UI.
// However, to keep it simple and strictly follow the "installed dependencies" list (which didn't include CVA),
// I will build a standard React component with clean props.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "solid" | "outline" | "ghost"
    size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "solid", size = "md", ...props }, ref) => {
        const variants = {
            solid: "bg-[#ededed] text-[#0a0a0a] hover:bg-white/90",
            outline: "border border-[#ededed]/30 bg-transparent text-[#ededed] hover:bg-[#ededed]/10",
            ghost: "bg-transparent text-[#ededed] hover:bg-[#ededed]/10",
        }

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg",
        }

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-sm transition-all duration-300 font-medium tracking-wide disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"
