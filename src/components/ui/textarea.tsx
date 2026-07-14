import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Matches Input: hairline field, azure border on focus
        "flex field-sizing-content min-h-24 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-base transition-colors duration-300 outline-none placeholder:text-carbon-400 focus-visible:border-azure-600 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-bad md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
