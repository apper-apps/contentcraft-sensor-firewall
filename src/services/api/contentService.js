import contentTemplates from "@/services/mockData/contentTemplates.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Content generation templates and logic
const generateContentByType = (contentType, industry, audience, tone, additionalNotes) => {
  const templates = contentTemplates[contentType] || contentTemplates["blog-post"]
  const template = templates[Math.floor(Math.random() * templates.length)]
  
  // Replace placeholders with actual data
  let content = template.template
    .replace(/\[INDUSTRY\]/g, getIndustryName(industry))
    .replace(/\[AUDIENCE\]/g, getAudienceName(audience))
    .replace(/\[TONE_ADJUST\]/g, getToneAdjustment(tone))
    .replace(/\[BUSINESS_TYPE\]/g, getBusinessType(industry))
    .replace(/\[TARGET_PROBLEM\]/g, getTargetProblem(industry, audience))
    .replace(/\[SOLUTION\]/g, getSolution(industry))
    .replace(/\[CALL_TO_ACTION\]/g, getCallToAction(contentType, tone))
  
  // Add additional notes context if provided
  if (additionalNotes && additionalNotes.trim()) {
    content += `\n\n${additionalNotes}`
  }
  
  return content
}

const getIndustryName = (industry) => {
  const industries = {
    "fitness": "fitness and wellness",
    "bakery": "bakery and artisanal foods",
    "tech": "technology and innovation",
    "beauty": "beauty and skincare",
    "retail": "retail and e-commerce",
    "consulting": "professional consulting",
    "education": "education and training",
    "real-estate": "real estate",
    "automotive": "automotive services",
    "hospitality": "hospitality and travel"
  }
  return industries[industry] || industry
}

const getAudienceName = (audience) => {
  const audiences = {
    "young-adults": "young adults seeking new experiences",
    "millennials": "busy millennials balancing work and life",
    "gen-x": "experienced Gen X professionals",
    "baby-boomers": "accomplished baby boomers",
    "parents": "dedicated parents",
    "entrepreneurs": "ambitious entrepreneurs",
    "professionals": "career-focused professionals",
    "students": "motivated students",
    "seniors": "active seniors"
  }
  return audiences[audience] || audience
}

const getToneAdjustment = (tone) => {
  const adjustments = {
    "professional": "maintaining the highest standards of professionalism",
    "casual": "in a friendly, approachable way",
    "humorous": "with a touch of humor and personality",
    "inspirational": "inspiring positive action and growth",
    "educational": "providing valuable insights and knowledge",
    "conversational": "through genuine, personal connection",
    "authoritative": "with expertise and industry leadership",
    "empathetic": "understanding your unique challenges and needs"
  }
  return adjustments[tone] || ""
}

const getBusinessType = (industry) => {
  const types = {
    "fitness": "fitness center",
    "bakery": "artisanal bakery",
    "tech": "innovative tech company",
    "beauty": "beauty salon",
    "retail": "retail business",
    "consulting": "consulting firm",
    "education": "educational institution",
    "real-estate": "real estate agency",
    "automotive": "automotive service center",
    "hospitality": "hospitality business"
  }
  return types[industry] || "local business"
}

const getTargetProblem = (industry, audience) => {
  const problems = {
    "fitness": {
      "young-adults": "staying motivated with busy schedules",
      "parents": "finding time for self-care",
      "professionals": "managing stress and staying healthy",
      "default": "achieving fitness goals consistently"
    },
    "bakery": {
      "parents": "finding healthy, delicious options for families",
      "professionals": "quick breakfast and lunch solutions",
      "default": "finding fresh, quality baked goods"
    },
    "tech": {
      "entrepreneurs": "scaling their business efficiently",
      "professionals": "staying competitive in their field",
      "default": "keeping up with technological advances"
    },
    "default": {
      "default": "finding reliable, quality solutions"
    }
  }
  
  const industryProblems = problems[industry] || problems.default
  return industryProblems[audience] || industryProblems.default
}

const getSolution = (industry) => {
  const solutions = {
    "fitness": "personalized workout plans and expert guidance",
    "bakery": "fresh, high-quality baked goods made daily",
    "tech": "cutting-edge technology solutions",
    "beauty": "professional beauty treatments and products",
    "retail": "curated products and exceptional service",
    "consulting": "expert advice and strategic guidance",
    "education": "comprehensive learning programs",
    "real-estate": "expert market knowledge and personalized service",
    "automotive": "reliable automotive services and expertise",
    "hospitality": "exceptional experiences and customer service"
  }
  return solutions[industry] || "tailored solutions for your needs"
}

const getCallToAction = (contentType, tone) => {
  const ctas = {
    "blog-post": {
      "professional": "Contact us today to learn more about our services.",
      "casual": "Ready to get started? Give us a call!",
      "humorous": "Don't wait – your future self will thank you!",
      "default": "Take the next step and reach out today."
    },
    "social-media": {
      "professional": "Learn more in our bio link.",
      "casual": "DM us for details! 💬",
      "humorous": "Hit that follow button if you're ready to level up! 🚀",
      "default": "Follow us for more updates!"
    },
    "email-campaign": {
      "professional": "Schedule a consultation today.",
      "casual": "Reply to this email to get started!",
      "default": "Click here to learn more."
    },
    "ad-copy": {
      "professional": "Contact us for a free consultation.",
      "casual": "Get started today!",
      "default": "Learn more now."
    },
    "landing-page": {
      "professional": "Schedule your free consultation today.",
      "casual": "Get started with a free trial!",
      "default": "Sign up now to begin."
    },
    "default": {
      "default": "Contact us today to learn more."
    }
  }
  
  const contentCtas = ctas[contentType] || ctas.default
  return contentCtas[tone] || contentCtas.default
}

export const generateContent = async (formData) => {
  await delay(Math.floor(Math.random() * 1500) + 1000) // 1-2.5 second delay
  
  try {
    const content = generateContentByType(
      formData.contentType,
      formData.industry,
      formData.targetAudience,
      formData.tone,
      formData.additionalNotes
    )
    
    if (!content || content.trim().length === 0) {
      throw new Error("Failed to generate content")
    }
    
    return content
  } catch (error) {
    throw new Error("Unable to generate content at this time. Please try again.")
  }
}

export const getContentHistory = async () => {
  await delay(300)
  
  // Return empty array for now - could be extended to store history
  return []
}

export const saveContentToHistory = async (contentData) => {
  await delay(200)
  
  // Simulate saving to history
  return {
    Id: Date.now(),
    ...contentData,
    createdAt: new Date()
  }
}