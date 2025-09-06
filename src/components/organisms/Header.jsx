import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import PricingModal from "@/components/molecules/PricingModal";
import { AuthContext } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import ThemeToggle from "@/components/atoms/ThemeToggle";
import Button from "@/components/atoms/Button";
const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 text-sm"
    >
      <ApperIcon name="LogOut" className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
};
const Header = () => {
  const [showPricingModal, setShowPricingModal] = useState(false);

  return (
    <>
      <header className="relative py-4 sm:py-6 border-b dark:border-gray-800 light:border-purple-200/50 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center">
                  <ApperIcon name="Sparkles" className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold dark:text-white light:text-purple-900">
                    ContentCraft AI
                  </h1>
                  <p className="text-xs dark:text-gray-400 light:text-purple-600">
                    AI-Powered Content Generation
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPricingModal(true)}
                className="hidden sm:flex"
              >
                <ApperIcon name="CreditCard" className="h-4 w-4 mr-2" />
                Pricing
              </Button>
              <ThemeToggle />
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1
                }}>
                <div className="hidden sm:flex items-center gap-2 text-sm dark:text-gray-200 light:text-purple-600">
                  <ApperIcon name="Zap" className="h-4 w-4 text-primary-400" />
                  AI Powered
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm dark:text-gray-200 light:text-purple-600">
                  <ApperIcon name="Clock" className="h-4 w-4 dark:text-gray-300 light:text-purple-500" />
                  Instant Results
                </div>
              </motion.div>
              <LogoutButton />
            </motion.div>
          </div>
        </div>
      </header>
      
      {/* Pricing Modal */}
      <PricingModal 
        isOpen={showPricingModal} 
        onClose={() => setShowPricingModal(false)} 
      />
    </>
  );
};

export default Header;