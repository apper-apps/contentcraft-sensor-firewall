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
  const [content, setContent] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [stats, setStats] = useState({
    totalGenerated: 156,
    todayGenerated: 23,
    avgResponseTime: "2.4s"
  });
const handleGenerate = async (formData) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Check usage limit before generating
      if (usageCount >= 3) {
        setShowSignupModal(true);
        setIsGenerating(false);
        return;
      }
      
      const newGeneratedContent = await generateContent(formData);
      
      setContent(newGeneratedContent);
      setGeneratedContent(newGeneratedContent);
      
      setUsageCount(prev => prev + 1);
      setStats(prev => ({
        ...prev,
        totalGenerated: prev.totalGenerated + 1,
        todayGenerated: prev.todayGenerated + 1
      }));
      
      toast.success("Content generated successfully! 🎉");
    } catch (err) {
      console.error('Content generation error:', err);
      setError(err.message || 'Failed to generate content');
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

const handleRetry = () => {
    setError(null);
    setContent("");
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };

  // Calculate content stats
  const wordCount = content ? content.trim().split(/\s+/).length : 0;
  const charCount = content ? content.length : 0;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleEditContent = (editedContent) => {
    setContent(editedContent);
  };
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
<h1 className="text-2xl sm:text-3xl font-display font-bold dark:text-white light:bg-gradient-to-r light:from-purple-600 light:to-purple-800 light:bg-clip-text light:text-transparent">
              Create Engaging Content in Seconds
            </h1>
<p className="text-xl dark:text-gray-200 light:text-purple-700 max-w-3xl mx-auto">
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

{/* Why Choose Our Content Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 mb-8"
        >
          <div className="text-center space-y-4">
<h2 className="text-3xl font-display font-bold dark:text-white light:text-gradient">
              Why Thousands of Businesses Choose ContentCraft AI
            </h2>
            <p className="text-xl dark:text-slate-400 light:text-purple-600 max-w-4xl mx-auto">
              Join successful businesses who have transformed their content strategy and saved countless hours while achieving better results
            </p>
          </div>
        </motion.div>

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
              <p className="dark:text-gray-200 light:text-purple-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gradient mb-4">
              The Smart Choice for Your Business
</h2>
            <p className="text-xl dark:text-gray-200 light:text-purple-600 max-w-3xl mx-auto">
              Discover why our AI-powered content generator is the preferred solution for businesses serious about growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "DollarSign",
                title: "Save 85% on Content Costs",
                description: "Replace expensive copywriters and agencies. Generate professional content for a fraction of the cost while maintaining quality that converts.",
                highlight: "Average savings: $2,400/month"
              },
              {
                icon: "Clock",
                title: "10x Faster Than Manual Writing",
                description: "What takes hours to write manually, our AI generates in seconds. Spend time on strategy and growth, not content creation.",
                highlight: "From hours to seconds"
              },
              {
                icon: "TrendingUp",
                title: "Proven to Increase Conversions",
                description: "Our AI is trained on high-converting content patterns. Generate copy that's optimized for engagement and sales from day one.",
                highlight: "Up to 40% higher engagement"
              },
              {
                icon: "Users",
                title: "Perfect for Any Business Size",
                description: "Whether you're a solopreneur or enterprise, scale your content production without hiring additional staff or resources.",
                highlight: "Scales with your growth"
              },
              {
                icon: "Shield",
                title: "Industry-Specific Expertise",
                description: "Unlike generic AI tools, our system understands your industry's unique language, challenges, and customer needs.",
                highlight: "10+ industries supported"
              },
              {
                icon: "Rocket",
                title: "Stay Ahead of Competition",
                description: "While competitors struggle with content creation, you'll have professional marketing materials ready in minutes.",
                highlight: "Competitive advantage guaranteed"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                whileHover={{ y: -8, scale: 1.02 }}
transition={{ duration: 0.3 }}
                className="dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-black/50 light:bg-gradient-to-br light:from-white light:to-purple-50/50 rounded-xl p-6 border dark:border-gray-700/30 light:border-purple-200/50 hover:border-primary-500/30 transition-colors duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center">
                      <ApperIcon name={benefit.icon} className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold dark:text-white light:text-purple-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="dark:text-gray-200 light:text-purple-600 text-sm leading-relaxed mb-3">
                      {benefit.description}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20">
                      <span className="text-xs font-medium text-primary-400">
                        {benefit.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12 p-8 bg-gradient-to-r from-primary-600/10 to-secondary-600/10 rounded-2xl border border-primary-500/20"
          >
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Ready to Transform Your Content Strategy?
            </h3>
<p className="dark:text-gray-200 light:text-purple-700 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of businesses who've already discovered the power of AI-generated content.
              Start creating professional marketing materials that convert in seconds, not hours.
            </p>
<div className="flex flex-wrap justify-center gap-6 text-sm dark:text-gray-300 light:text-purple-600">
              <div className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-green-400" />
                <span>No contracts or commitments</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-green-400" />
                <span>Start generating immediately</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-green-400" />
                <span>Professional results guaranteed</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      
      {/* Signup Modal */}
      <SignupModal 
        isOpen={showSignupModal} 
        onClose={handleCloseSignupModal} 
      />
</div>
  );
};

export default ContentGeneratorPage;