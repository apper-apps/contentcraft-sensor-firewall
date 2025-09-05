import { Card, CardContent } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No content yet", 
  description = "Generate your first piece of content to get started", 
  actionLabel = "Get Started",
  onAction,
  icon = "FileText",
  className 
}) => {
  return (
    <Card className={`h-full min-h-[400px] flex items-center justify-center ${className}`}>
      <CardContent className="text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary-600/10 to-secondary-600/10 flex items-center justify-center">
          <ApperIcon name={icon} className="h-8 w-8 text-primary-400" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>
          <p className="text-slate-400 max-w-md">
            {description}
          </p>
        </div>
        
        {onAction && (
          <Button 
            onClick={onAction} 
            className="gap-2"
          >
            <ApperIcon name="Sparkles" className="h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default Empty