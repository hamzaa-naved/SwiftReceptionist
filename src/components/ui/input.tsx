import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Daylight field: hairline border on white; azure border on focus
        "h-11 w-full min-w-0 rounded-xl border border-line bg-white px-4 py-1 text-base transition-colors duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-carbon-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-azure-600 focus-visible:outline-none",
        "aria-invalid:border-bad",
        className
      )}
      {...props}
    />
  )
}

export { Input }
