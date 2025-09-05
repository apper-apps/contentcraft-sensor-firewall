import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/utils/cn";

const ContentPreview = ({ content, wordCount, charCount, onEdit }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      toast.success("Content copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy content")
    }
  }

  if (!content) {
    return (
      <Card className="h-full min-h-[400px] flex items-center justify-center">
        <div className="text-center text-slate-400">
          <ApperIcon name="FileText" className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Your generated content will appear here</p>
          <p className="text-sm mt-2">Fill out the form and click generate to create content</p>
        </div>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gradient">Generated Content</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">
                {wordCount} words • {charCount} characters
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                <ApperIcon 
                  name={copied ? "Check" : "Copy"} 
                  className={cn("h-4 w-4", copied && "text-green-400")} 
                />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
<div className="bg-slate-600/80 rounded-lg p-4 border border-slate-700/50">
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-white leading-relaxed">
                {content}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(content)}
              className="gap-2"
            >
              <ApperIcon name="Edit3" className="h-4 w-4" />
              Edit Content
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              <ApperIcon name="Share" className="h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ContentPreview