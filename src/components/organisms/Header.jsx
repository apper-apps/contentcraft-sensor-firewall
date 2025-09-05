import { motion } from "framer-motion";
import ThemeToggle from "@/components/atoms/ThemeToggle";
import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
<header
    className="transition-colors duration-300 bg-gradient-to-r dark:from-slate-900/50 dark:to-slate-800/50 light:from-white/80 light:to-purple-50/80 backdrop-blur-sm border-b dark:border-slate-700/50 light:border-purple-200/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <motion.div
                className="flex items-center gap-3"
                initial={{
                    opacity: 0,
                    x: -20
                }}
                animate={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    duration: 0.5
                }}>
                <div
                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center shadow-lg">
                    <ApperIcon name="Sparkles" className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-display font-bold text-gradient">
                        <span className="dark:text-white light:text-purple-900">ContentCraft AI</span>
                    </h1>
                    <p className="text-xs dark:text-slate-400 light:text-purple-600">Smart Marketing Content Generator
                                      </p>
                </div>
            </motion.div>
            <motion.div className="flex items-center gap-4">
                <ThemeToggle />
                <div
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
                    <div
                        className="hidden sm:flex items-center gap-2 text-sm dark:text-slate-400 light:text-purple-600">
                        <ApperIcon name="Zap" className="h-4 w-4 text-primary-400" />AI Powered
                                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
                        <ApperIcon
                            name="Clock"
                            className="h-4 w-4 dark:text-secondary-400 light:text-purple-500" />Instant Results
                                    </div>
                </div></motion.div>
        </div>
    </div>
</header>
  )
}

export default Header