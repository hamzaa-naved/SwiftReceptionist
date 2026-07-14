import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap outline-none transition-all duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Solid carbon pill — the primary action, Apple-style
        default:
          "bg-carbon-950 text-snow hover:bg-carbon-800",
        // Azure pill for the highest-stakes moments
        accent:
          "bg-azure-600 text-snow hover:bg-azure-500",
        destructive:
          "bg-bad text-snow hover:opacity-90",
        // Quiet hairline pill
        outline:
          "border border-line bg-snow text-carbon-950 hover:border-carbon-400 hover:bg-cloud",
        secondary:
          "bg-cloud text-carbon-950 hover:bg-[#ececf0]",
        ghost:
          "text-carbon-600 hover:bg-cloud hover:text-carbon-950",
        // Azure text link with draw-in underline
        link: "link-underline rounded-none px-0 text-azure-600",
      },
      size: {
        default: "h-11 px-6 has-[>svg]:px-4",
        xs: "h-6 gap-1 px-2.5 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-13 px-8 text-[15px] has-[>svg]:px-6",
        icon: "size-11",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
