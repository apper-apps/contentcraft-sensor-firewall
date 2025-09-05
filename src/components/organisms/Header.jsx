import ApperIcon from "@/components/ApperIcon"
import { motion } from "framer-motion"

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center shadow-lg">
              <ApperIcon name="Sparkles" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-gradient">
                ContentCraft AI
              </h1>
              <p className="text-xs text-slate-400">
                Smart Marketing Content Generator
              </p>
            </div>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
              <ApperIcon name="Zap" className="h-4 w-4 text-primary-400" />
              AI Powered
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
              <ApperIcon name="Clock" className="h-4 w-4 text-secondary-400" />
              Instant Results
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

export default Header