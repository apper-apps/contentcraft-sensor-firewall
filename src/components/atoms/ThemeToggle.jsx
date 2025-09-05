import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/utils/cn'

const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        theme === 'dark' 
          ? "bg-gradient-to-r from-slate-700 to-slate-600 focus:ring-offset-slate-900" 
          : "bg-gradient-to-r from-purple-200 to-purple-300 focus:ring-offset-white",
        className
      )}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={cn(
          "w-4 h-4 rounded-full flex items-center justify-center shadow-lg",
          theme === 'dark'
            ? "bg-gradient-to-r from-amber-400 to-yellow-400"
            : "bg-gradient-to-r from-slate-600 to-slate-700"
        )}
        animate={{ x: theme === 'dark' ? 0 : 24 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <ApperIcon
          name={theme === 'dark' ? 'Moon' : 'Sun'}
          className={cn(
            "h-3 w-3 transition-colors duration-300",
            theme === 'dark' ? "text-slate-900" : "text-white"
          )}
        />
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle