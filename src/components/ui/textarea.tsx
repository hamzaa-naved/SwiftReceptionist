import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Matches Input: hairline field, ink border on focus, no ring
        "flex field-sizing-content min-h-24 w-full rounded-[2px] border border-line bg-ivory-raised px-3.5 py-2.5 text-base transition-colors duration-300 outline-none placeholder:text-espresso-500/70 focus-visible:border-espresso-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-oxblood-600 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
