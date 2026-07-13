import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 rounded-[2px] text-sm font-medium tracking-wide whitespace-nowrap outline-none transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.985] motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Solid espresso — the primary editorial action
        default:
          "bg-espresso-950 text-ivory hover:bg-espresso-800 hover:shadow-[0_16px_30px_-14px_rgb(23_19_13/0.6)]",
        destructive:
          "bg-oxblood-600 text-ivory hover:bg-espresso-950",
        // Hairline outline that fills with ink on hover
        outline:
          "border border-espresso-950/25 bg-transparent text-espresso-950 hover:border-espresso-950 hover:bg-espresso-950 hover:text-ivory",
        secondary:
          "bg-ivory-deep text-espresso-900 hover:bg-brass-100",
        ghost:
          "text-espresso-900 hover:bg-espresso-950/5",
        // Brass draw-in underline — the site's signature link treatment
        link: "link-underline rounded-none px-0 text-espresso-950",
      },
      size: {
        default: "h-11 px-6 has-[>svg]:px-4",
        xs: "h-6 gap-1 rounded-[2px] px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-[2px] px-4 has-[>svg]:px-3",
        lg: "h-13 rounded-[2px] px-8 text-[15px] has-[>svg]:px-6",
        icon: "size-11",
        "icon-xs": "size-6 rounded-[2px] [&_svg:not([class*='size-'])]:size-3",
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
