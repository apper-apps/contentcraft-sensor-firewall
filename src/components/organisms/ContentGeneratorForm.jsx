import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";

const ContentGeneratorForm = ({ onGenerate, isGenerating }) => {
  const [formData, setFormData] = useState({
    industry: "",
    targetAudience: "",
    tone: "",
contentType: "",
    additionalNotes: ""
  });

  const industries = [
    { value: "", label: "Select Industry" },
    { value: "fitness", label: "Fitness & Health" },
    { value: "bakery", label: "Bakery & Food" },
    { value: "tech", label: "Technology" },
    { value: "beauty", label: "Beauty & Wellness" },
    { value: "retail", label: "Retail & E-commerce" },
    { value: "consulting", label: "Consulting & Services" },
    { value: "education", label: "Education & Training" },
    { value: "real-estate", label: "Real Estate" },
    { value: "automotive", label: "Automotive" },
    { value: "hospitality", label: "Hospitality & Travel" }
  ]

  const audiences = [
    { value: "", label: "Select Target Audience" },
    { value: "young-adults", label: "Young Adults (18-30)" },
    { value: "millennials", label: "Millennials (31-40)" },
    { value: "gen-x", label: "Gen X (41-56)" },
    { value: "baby-boomers", label: "Baby Boomers (57+)" },
    { value: "parents", label: "Parents & Families" },
    { value: "entrepreneurs", label: "Entrepreneurs" },
    { value: "professionals", label: "Business Professionals" },
    { value: "students", label: "Students" },
    { value: "seniors", label: "Seniors (65+)" }
  ]

  const tones = [
    { value: "", label: "Select Tone" },
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual & Friendly" },
    { value: "humorous", label: "Humorous & Fun" },
    { value: "inspirational", label: "Inspirational" },
    { value: "educational", label: "Educational" },
    { value: "conversational", label: "Conversational" },
    { value: "authoritative", label: "Authoritative" },
    { value: "empathetic", label: "Empathetic" }
  ]

  const contentTypes = [
    { value: "", label: "Select Content Type" },
    { value: "blog-post", label: "Blog Post" },
    { value: "social-media", label: "Social Media Post" },
    { value: "email-campaign", label: "Email Campaign" },
    { value: "ad-copy", label: "Ad Copy" },
    { value: "landing-page", label: "Website Landing Page" },
    { value: "newsletter", label: "Newsletter" },
    { value: "product-description", label: "Product Description" }
  ]

const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.industry || !formData.targetAudience || !formData.tone || !formData.contentType) {
      return
    }
    
    // Map form field names to database field names
    const mappedFormData = {
      industry_c: formData.industry,
      target_audience_c: formData.targetAudience,
      tone_c: formData.tone,
      content_type_c: formData.contentType,
      additional_notes_c: formData.additionalNotes,
      // Keep original names for backward compatibility
      industry: formData.industry,
      targetAudience: formData.targetAudience,
      tone: formData.tone,
      contentType: formData.contentType,
      additionalNotes: formData.additionalNotes
    }
    
    onGenerate(mappedFormData)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isFormValid = formData.industry && formData.targetAudience && formData.tone && formData.contentType

  return (
<Card className="h-full dark:bg-gradient-to-br dark:from-gray-900/50 dark:to-black/50 light:bg-gradient-to-br light:from-purple-50 light:to-purple-100/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center">
            <ApperIcon name="Sparkles" className="h-5 w-5 text-white" />
          </div>
          Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Business Industry" required>
<Select
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
            >
              {industries.map(industry => (
                <option key={industry.value} value={industry.value}>
                  {industry.label}
                </option>
              ))}
            </Select>
          </FormField>

<FormField label="Target Audience" required>
            <Select
              value={formData.targetAudience}
              onChange={(e) => handleInputChange("targetAudience", e.target.value)}
            >
              {audiences.map(audience => (
                <option key={audience.value} value={audience.value}>
                  {audience.label}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Content Tone" required>
            <Select
              value={formData.tone}
              onChange={(e) => handleInputChange("tone", e.target.value)}
            >
              {tones.map(tone => (
                <option key={tone.value} value={tone.value}>
                  {tone.label}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Content Type" required>
            <Select
              value={formData.contentType}
              onChange={(e) => handleInputChange("contentType", e.target.value)}
            >
              {contentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Additional Notes">
            <Textarea
              placeholder="Any specific instructions, keywords, or requirements..."
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
              rows={4}
            />
          </FormField>

          <motion.div
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
          >
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700"
              disabled={!isFormValid || isGenerating}
            >
              {isGenerating ? (
                <>
                  <ApperIcon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <ApperIcon name="Sparkles" className="mr-2 h-5 w-5" />
                  Generate Content
                </>
              )}
            </Button>
          </motion.div>

          {!isFormValid && (
<p className="text-sm dark:text-gray-300 light:text-purple-800 text-center">
              Please fill in all required fields to generate content
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default ContentGeneratorForm