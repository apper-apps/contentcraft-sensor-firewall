// Helper functions for content generation

export function generateContentByType(contentType, industry, audience, tone, additionalNotes, contentTemplates) {
  try {
    // Validate inputs
    if (!contentType || !industry || !audience || !tone) {
      return '';
    }

    // Get templates for the content type
    const templates = contentTemplates[contentType];
    if (!templates || templates.length === 0) {
      return '';
    }

    // Select a random template
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    let content = randomTemplate.template;

    // Process all placeholders
    content = processContentPlaceholders(content, industry, audience, tone, additionalNotes);

    return content;
  } catch (error) {
    console.error('Error in generateContentByType:', error);
    return '';
  }
}

function processContentPlaceholders(content, industry, audience, tone, additionalNotes) {
  // Replace placeholders with actual values
  let processedContent = content;

  // Basic replacements
  processedContent = processedContent.replace(/\[INDUSTRY\]/g, getIndustryName(industry));
  processedContent = processedContent.replace(/\[AUDIENCE\]/g, getAudienceName(audience));
  processedContent = processedContent.replace(/\[TONE_ADJUST\]/g, getToneAdjustment(tone));
  processedContent = processedContent.replace(/\[BUSINESS_TYPE\]/g, getBusinessType(industry));
  processedContent = processedContent.replace(/\[TARGET_PROBLEM\]/g, getTargetProblem(industry, audience));
  processedContent = processedContent.replace(/\[SOLUTION\]/g, getSolution(industry));
  processedContent = processedContent.replace(/\[CALL_TO_ACTION\]/g, getCallToAction(processedContent, tone));

  // Add additional notes if provided
  if (additionalNotes && additionalNotes.trim()) {
    processedContent += `\n\nAdditional Notes: ${additionalNotes}`;
  }

  return processedContent;
}

function getIndustryName(industry) {
  const industryNames = {
    'fitness': 'fitness and health',
    'bakery': 'bakery and food service',
    'tech': 'technology',
    'beauty': 'beauty and wellness',
    'retail': 'retail and e-commerce',
    'consulting': 'consulting and professional services',
    'education': 'education and training',
    'real-estate': 'real estate',
    'automotive': 'automotive',
    'hospitality': 'hospitality and travel'
  };
  return industryNames[industry] || industry;
}

function getAudienceName(audience) {
  const audienceNames = {
    'young-adults': 'young adults',
    'millennials': 'millennials',
    'gen-x': 'Generation X professionals',
    'baby-boomers': 'baby boomers',
    'parents': 'parents and families',
    'entrepreneurs': 'entrepreneurs and business owners',
    'professionals': 'business professionals',
    'students': 'students and learners',
    'seniors': 'seniors and retirees'
  };
  return audienceNames[audience] || audience;
}

function getToneAdjustment(tone) {
  const toneAdjustments = {
    'professional': 'maintaining the highest professional standards',
    'casual': 'keeping things friendly and approachable',
    'humorous': 'adding a touch of humor and personality',
    'inspirational': 'inspiring and motivating you every step of the way',
    'educational': 'providing clear, educational guidance',
    'conversational': 'speaking to you like a trusted friend',
    'authoritative': 'delivering expert insights with confidence',
    'empathetic': 'understanding your unique challenges and needs'
  };
  return toneAdjustments[tone] || 'delivering personalized service';
}

function getBusinessType(industry) {
  const businessTypes = {
    'fitness': 'fitness center',
    'bakery': 'bakery',
    'tech': 'technology company',
    'beauty': 'beauty salon',
    'retail': 'retail store',
    'consulting': 'consulting firm',
    'education': 'educational institution',
    'real-estate': 'real estate agency',
    'automotive': 'automotive service center',
    'hospitality': 'hospitality business'
  };
  return businessTypes[industry] || 'business';
}

function getTargetProblem(industry, audience) {
  const problems = {
    'fitness-young-adults': 'finding time to stay fit with a busy lifestyle',
    'fitness-millennials': 'balancing work-life demands while maintaining health',
    'fitness-professionals': 'staying consistent with fitness goals despite work pressure',
    'bakery-parents': 'finding fresh, healthy baked goods for the family',
    'bakery-professionals': 'getting quality baked goods that fit your schedule',
    'tech-entrepreneurs': 'keeping up with rapidly changing technology trends',
    'tech-professionals': 'implementing new technologies efficiently',
    'beauty-young-adults': 'achieving the perfect look within budget',
    'beauty-millennials': 'maintaining a beauty routine with limited time',
    'retail-parents': 'finding quality products at affordable prices',
    'retail-professionals': 'shopping efficiently without compromising on quality',
    'consulting-entrepreneurs': 'scaling your business without the right expertise',
    'consulting-professionals': 'solving complex business challenges',
    'education-students': 'learning effectively in today\'s competitive environment',
    'education-professionals': 'developing new skills while working full-time',
    'real-estate-parents': 'finding the perfect family home within budget',
    'real-estate-professionals': 'making smart real estate investment decisions',
    'automotive-professionals': 'keeping your vehicle reliable without breaking the bank',
    'hospitality-parents': 'planning memorable family vacations within budget'
  };
  
  const key = `${industry}-${audience}`;
  return problems[key] || 'the challenges you face every day';
}

function getSolution(industry) {
  const solutions = {
    'fitness': 'personalized fitness programs that fit your lifestyle',
    'bakery': 'freshly baked goods made with premium ingredients',
    'tech': 'cutting-edge technology solutions tailored to your needs',
    'beauty': 'professional beauty treatments that enhance your natural beauty',
    'retail': 'carefully curated products that deliver exceptional value',
    'consulting': 'strategic consulting services that drive real results',
    'education': 'comprehensive learning programs designed for success',
    'real-estate': 'expert real estate guidance that protects your investment',
    'automotive': 'reliable automotive services that keep you on the road',
    'hospitality': 'unforgettable experiences that create lasting memories'
  };
  return solutions[industry] || 'tailored solutions that deliver results';
}

function getCallToAction(contentType, tone) {
  const ctas = {
    'blog-post-professional': 'Contact us today to learn how we can help you achieve your goals.',
    'blog-post-casual': 'Ready to get started? Reach out and let\'s chat!',
    'blog-post-inspirational': 'Your transformation journey starts with a single step. Take it today.',
    'social-media-professional': 'Learn more: [Link]',
    'social-media-casual': 'DM us to get started! 💬',
    'social-media-humorous': 'Don\'t wait – your future self will thank you! 🚀',
    'email-campaign': 'Click here to schedule your consultation today.',
    'ad-copy': 'Get Started Now – Limited Time Offer!',
    'landing-page': 'Get Your Free Consultation Today – No Obligations, Just Results.',
    'newsletter': 'Stay tuned for next week\'s insights, and feel free to reach out with any questions.',
    'product-description': 'Order now and experience the difference for yourself.'
  };
  
  // Try to find specific CTA
  const specificKey = `${contentType}-${tone}`;
  if (ctas[specificKey]) {
    return ctas[specificKey];
  }
  
  // Fallback to content type
  if (ctas[contentType]) {
    return ctas[contentType];
  }
  
  // Default CTA
  return 'Contact us today to learn more about how we can help you succeed.';
}