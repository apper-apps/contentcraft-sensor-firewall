import Modal from "@/components/atoms/Modal"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { motion } from "framer-motion"

const SignupModal = ({ isOpen, onClose }) => {
  const handleSignUp = () => {
    // In a real app, this would redirect to signup page or open signup flow
    console.log("Redirecting to signup...")
    onClose()
  }

  const handleMaybeLater = () => {
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-8">
      <div className="text-center space-y-6">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <ApperIcon name="Zap" className="h-8 w-8 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-2xl font-bold dark:text-white light:text-purple-900"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Try More Workouts!
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg dark:text-slate-300 light:text-purple-700 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          You've used 3 free sessions. Sign up to get 50 credits daily!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="space-y-3 pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={handleSignUp}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transform hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="UserPlus" className="mr-2 h-5 w-5" />
            Sign Up Now
          </Button>
          
          <Button
            onClick={handleMaybeLater}
            variant="secondary"
            className="w-full h-12 text-lg font-medium dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 light:bg-purple-100 light:hover:bg-purple-200 light:text-purple-800 border-0"
          >
            Maybe Later
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="pt-4 border-t dark:border-slate-700/50 light:border-purple-200/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 text-sm dark:text-slate-400 light:text-purple-600">
            <ApperIcon name="Shield" className="h-4 w-4" />
            <span>No credit card required • Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </Modal>
  )
}

export default SignupModal