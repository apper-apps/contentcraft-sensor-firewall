import Label from "@/components/atoms/Label"
import { cn } from "@/utils/cn"

const FormField = ({ label, children, className, required = false, ...props }) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <Label className="block">
          {label}
          {required && <span className="text-accent-500 ml-1">*</span>}
        </Label>
      )}
      {children}
    </div>
  )
}

export default FormField