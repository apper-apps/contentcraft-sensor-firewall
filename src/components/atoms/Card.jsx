import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
"rounded-xl dark:bg-gradient-to-br dark:from-gray-800/30 dark:to-black/50 light:bg-gradient-to-br light:from-white light:to-gray-50/50 border dark:border-gray-700/30 light:border-gray-300/50 backdrop-blur-sm shadow-2xl",
        className
      )}
      {...props}
    />
  )
})

Card.displayName = "Card"

const CardHeader = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
})

CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
className={cn(
"text-2xl font-semibold leading-none tracking-tight dark:text-white light:text-black",
        className
      )}
      {...props}
    />
  )
})

CardTitle.displayName = "CardTitle"

const CardContent = forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
})

CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }