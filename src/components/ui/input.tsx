import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Editorial field: hairline border on a raised-ivory ground; focus
        // deepens the border to ink instead of adding a ring
        "h-11 w-full min-w-0 rounded-[2px] border border-line bg-ivory-raised px-3.5 py-1 text-base transition-colors duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-espresso-500/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-espresso-950 focus-visible:outline-none",
        "aria-invalid:border-oxblood-600",
        className
      )}
      {...props}
    />
  )
}

export { Input }
