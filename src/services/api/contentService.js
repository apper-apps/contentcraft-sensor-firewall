// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

// Content generation templates and logic
const generateContentByType = async (contentType, industry, audience, tone, additionalNotes) => {
  // Import templates from JSON file to ensure variety and prevent duplicates
  const templateModule = await import('/src/services/mockData/contentTemplates.json');
  const templates = templateModule.default;
  
  const contentTypeTemplates = templates[contentType] || templates["blog-post"]
  const template = contentTypeTemplates[Math.floor(Math.random() * contentTypeTemplates.length)]
  
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

// Content Templates Service - using content_template_c table
export const getContentTemplates = async () => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "Tags" } },
        { field: { Name: "template_c" } },
        { field: { Name: "content_type_c" } }
      ],
      pagingInfo: { limit: 100, offset: 0 }
    };
    
    const response = await apperClient.fetchRecords('content_template_c', params);
    
    if (!response.success) {
      console.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching content templates:", error?.response?.data?.message || error);
    return [];
  }
};

// Generated Content Service - using generated_content_c table
export const createGeneratedContent = async (contentData) => {
  try {
    const params = {
      records: [{
        Name: contentData.name || `Generated Content - ${new Date().toLocaleDateString()}`,
        industry_c: contentData.industry,
        target_audience_c: contentData.targetAudience,
        tone_c: contentData.tone,
        content_type_c: contentData.contentType,
        additional_notes_c: contentData.additionalNotes || '',
        content_c: contentData.content,
        word_count_c: contentData.wordCount || 0
      }]
    };
    
    const response = await apperClient.createRecord('generated_content_c', params);
    
    if (!response.success) {
      console.error(response.message);
      return null;
    }
    
    if (response.results && response.results.length > 0) {
      const successfulRecord = response.results.find(result => result.success);
      return successfulRecord ? successfulRecord.data : null;
    }
    
    return null;
  } catch (error) {
    console.error("Error creating generated content:", error?.response?.data?.message || error);
    return null;
  }
};

export const getGeneratedContent = async () => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "Tags" } },
        { field: { Name: "industry_c" } },
        { field: { Name: "target_audience_c" } },
        { field: { Name: "tone_c" } },
        { field: { Name: "content_type_c" } },
        { field: { Name: "additional_notes_c" } },
        { field: { Name: "content_c" } },
        { field: { Name: "word_count_c" } },
        { field: { Name: "CreatedOn" } }
      ],
      orderBy: [{ fieldName: "CreatedOn", sorttype: "DESC" }],
      pagingInfo: { limit: 50, offset: 0 }
    };
    
    const response = await apperClient.fetchRecords('generated_content_c', params);
    
    if (!response.success) {
      console.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching generated content:", error?.response?.data?.message || error);
    return [];
  }
};

// Main content generation function
export const generateContent = async (formData) => {
  try {
    // Generate the content using templates
const content = generateContentByType(
      formData.contentType,
      formData.industry,
      formData.targetAudience,
      formData.tone,
      formData.additionalNotes
    );
    
    // Type-safe content validation to prevent trim() errors on non-strings
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      throw new Error('Failed to generate valid content. Please try again with different parameters.');
    }
    
    if (!content || content.trim().length === 0) {
      throw new Error("Failed to generate content");
    }
    
    // Calculate word count
    const wordCount = content.trim().split(/\s+/).length;
    
    // Save to database
    const contentData = {
      name: `${formData.contentType} - ${new Date().toLocaleDateString()}`,
      industry: formData.industry,
      targetAudience: formData.targetAudience,
      tone: formData.tone,
      contentType: formData.contentType,
      additionalNotes: formData.additionalNotes,
      content: content,
      wordCount: wordCount
    };
    
    // Save the generated content to database
    await createGeneratedContent(contentData);
    
    return content;
  } catch (error) {
    console.error("Error in generateContent:", error);
    throw new Error("Unable to generate content at this time. Please try again.");
  }
};

// Legacy functions for backward compatibility
export const getContentHistory = async () => {
  return await getGeneratedContent();
};

export const saveContentToHistory = async (contentData) => {
  return await createGeneratedContent(contentData);
};