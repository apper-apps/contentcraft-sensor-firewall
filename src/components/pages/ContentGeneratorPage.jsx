import React, { useState } from "react";
import Header from "@/components/organisms/Header";
import ContentGeneratorForm from "@/components/organisms/ContentGeneratorForm";
import ContentPreview from "@/components/molecules/ContentPreview";
import StatsDisplay from "@/components/molecules/StatsDisplay";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { generateContent } from "@/services/api/contentService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
const ContentGeneratorPage = () => {
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [estimatedReadTime, setEstimatedReadTime] = useState(0)

  const handleGenerate = async (formData) => {
    setIsGenerating(true)
    setError(null)
    
    try {
      const content = await generateContent(formData)
      setGeneratedContent(content)
      
      // Calculate stats
      const words = content.trim().split(/\s+/).length
      const chars = content.length
      const readTime = Math.max(1, Math.ceil(words / 200)) // 200 words per minute average
      
      setWordCount(words)
      setCharCount(chars)
      setEstimatedReadTime(readTime)
      
      toast.success("Content generated successfully!")
    } catch (err) {
      setError(err.message)
      toast.error("Failed to generate content")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEditContent = (content) => {
    // For now, just copy to clipboard for editing elsewhere
    navigator.clipboard.writeText(content)
    toast.info("Content copied to clipboard for editing!")
  }

  const handleRetry = () => {
    setError(null)
    setGeneratedContent("")
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gradient">
              Create Engaging Content in Seconds
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Generate personalized marketing content for your business with AI. 
              From blog posts to social media, create professional content that converts.
            </p>
          </div>
        </motion.div>

        {/* Stats Display */}
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <StatsDisplay 
              wordCount={wordCount}
              charCount={charCount}
              estimatedReadTime={estimatedReadTime}
            />
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content Generation Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ContentGeneratorForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </motion.div>

          {/* Generated Content Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isGenerating ? (
              <Loading />
            ) : error ? (
              <Error 
                message={error}
                onRetry={handleRetry}
              />
            ) : (
              <ContentPreview
                content={generatedContent}
                wordCount={wordCount}
                charCount={charCount}
                onEdit={handleEditContent}
              />
            )}
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: "Zap",
              title: "Lightning Fast",
              description: "Generate professional content in seconds, not hours"
            },
            {
              icon: "Target",
              title: "Audience Focused",
              description: "Tailored content that speaks directly to your target market"
            },
            {
              icon: "Palette",
              title: "Multiple Formats",
              description: "From blog posts to ads, create any type of marketing content"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
className="text-center space-y-4"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-primary-600/20 to-secondary-600/20 flex items-center justify-center border border-primary-500/20">
                <ApperIcon name={feature.icon} className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}

export default ContentGeneratorPage