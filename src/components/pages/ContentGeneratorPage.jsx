import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { generateContent } from "@/services/api/contentService";
import ApperIcon from "@/components/ApperIcon";
import Header from "@/components/organisms/Header";
import ContentGeneratorForm from "@/components/organisms/ContentGeneratorForm";
import StatsDisplay from "@/components/molecules/StatsDisplay";
import ContentPreview from "@/components/molecules/ContentPreview";
import SignupModal from "@/components/molecules/SignupModal";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";

const ContentGeneratorPage = () => {
  const [content, setContent] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [usageCount, setUsageCount] = useState(0)
  const [stats, setStats] = useState({
    totalGenerated: 156,
    todayGenerated: 23,
    avgResponseTime: "2.4s"
  })
const handleGenerate = async (formData) => {
    setIsGenerating(true)
    setError(null)
    
    try {
      // Check usage limit before generating
      if (usageCount >= 3) {
        setShowSignupModal(true)
        setIsGenerating(false)
        return
      }
      
      const generatedContent = await generateContent(formData)
      
      setContent(generatedContent)
      setGeneratedContent(generatedContent)
      setWordCount(generatedContent.split(' ').length)
      setUsageCount(prev => prev + 1)
      setStats(prev => ({
        ...prev,
        totalGenerated: prev.totalGenerated + 1,
        todayGenerated: prev.todayGenerated + 1
      }))
      
      toast.success("Content generated successfully! 🎉")
    } catch (err) {
      console.error('Content generation error:', err)
      setError(err.message || 'Failed to generate content')
      toast.error("Failed to generate content. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRetry = () => {
    setError(null)
    setContent("")
  }

  const handleCloseSignupModal = () => {
    setShowSignupModal(false)
  }

  // Calculate content stats
  const wordCount = content ? content.trim().split(/\s+/).length : 0
  const charCount = content ? content.length : 0
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200))

  const handleEditContent = (editedContent) => {
    setContent(editedContent)
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-center space-y-4">
<h1 className="text-4xl sm:text-5xl font-display font-bold text-gradient dark:text-gradient light:bg-gradient-to-r light:from-purple-600 light:to-purple-800 light:bg-clip-text light:text-transparent">
              Create Engaging Content in Seconds
            </h1>
<p className="text-xl dark:text-slate-400 light:text-purple-700 max-w-3xl mx-auto">
              Generate personalized marketing content for your business with AI. 
              From blog posts to social media, create professional content that converts.
            </p>
          </div>
        </motion.div>

        {/* Stats Display */}
{content && (
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
                content={content}
                wordCount={wordCount}
                charCount={charCount}
                onEdit={handleEditContent}
              />
            )}
          </motion.div>
        </div>

{/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mt-16"
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
              <h3 className="text-xl font-semibold dark:text-white light:text-purple-900">
                {feature.title}
              </h3>
              <p className="dark:text-slate-400 light:text-purple-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </main>
      
      {/* Signup Modal */}
      <SignupModal 
        isOpen={showSignupModal} 
        onClose={handleCloseSignupModal} 
      />
    </div>
  )
}
export default ContentGeneratorPage