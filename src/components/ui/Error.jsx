import { Card, CardContent } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Something went wrong", onRetry, className }) => {
  return (
    <Card className={`h-full min-h-[400px] flex items-center justify-center ${className}`}>
      <CardContent className="text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
          <ApperIcon name="AlertTriangle" className="h-8 w-8 text-red-400" />
        </div>
        
        <div className="space-y-2">
<h3 className="text-lg font-semibold dark:text-white light:text-red-700">
            Oops! Something went wrong
          </h3>
<p className="dark:text-gray-200 light:text-red-600 max-w-md">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <Button 
            onClick={onRetry} 
            variant="outline" 
            className="gap-2"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default Error