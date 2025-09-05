import { Card, CardContent } from "@/components/atoms/Card"
import { motion } from "framer-motion"

const Loading = ({ className }) => {
  return (
    <Card className={`h-full min-h-[400px] ${className}`}>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-8 w-48 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg animate-shimmer"></div>
            <div className="h-6 w-32 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg animate-shimmer"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded animate-shimmer"
                style={{ width: `${Math.random() * 40 + 60}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
          
          {/* Button skeleton */}
          <div className="flex gap-2 pt-4">
            <div className="h-9 w-24 bg-gradient-to-r from-primary-700/50 to-secondary-700/50 rounded-lg animate-shimmer"></div>
            <div className="h-9 w-20 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg animate-shimmer"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Loading