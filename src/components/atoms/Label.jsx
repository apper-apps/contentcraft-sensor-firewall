import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Label = forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
"text-sm font-medium dark:text-slate-300 light:text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
})

Label.displayName = "Label"

export default Label