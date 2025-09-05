import { Card, CardContent } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import { motion } from "framer-motion"

const StatsDisplay = ({ wordCount = 0, charCount = 0, estimatedReadTime = 0 }) => {
  const stats = [
    {
      label: "Words",
      value: wordCount,
      icon: "Type",
      color: "text-primary-400"
    },
    {
      label: "Characters",
      value: charCount,
      icon: "Hash",
      color: "text-secondary-400"
    },
    {
      label: "Read Time",
      value: `${estimatedReadTime}min`,
      icon: "Clock",
      color: "text-accent-400"
    }
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-4 text-center">
            <CardContent className="p-0">
              <div className="flex flex-col items-center gap-2">
                <ApperIcon 
                  name={stat.icon} 
                  className={`h-5 w-5 ${stat.color}`} 
                />
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">
                  {stat.label}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default StatsDisplay