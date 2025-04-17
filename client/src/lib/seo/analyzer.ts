import { SEOAnalysis } from "@shared/schema";

// This file can be used for client-side analysis and validation
// of SEO tags, though primary analysis happens on the server

export function validateUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    // If URL doesn't have protocol, add https://
    let urlToValidate = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      urlToValidate = `https://${url}`;
    }
    
    new URL(urlToValidate);
    return true;
  } catch (err) {
    return false;
  }
}

export function formatUrl(url: string): string {
  // Format URL for display (remove protocol, etc.)
  try {
    const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
    return urlObj.hostname + urlObj.pathname;
  } catch (e) {
    return url;
  }
}

export function getDomain(url: string): string {
  try {
    const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
    return urlObj.hostname;
  } catch (e) {
    return url;
  }
}

export function analyzeTitle(title?: string): {
  status: "good" | "warning" | "error";
  message?: string;
} {
  if (!title) {
    return {
      status: "error",
      message: "Missing title tag",
    };
  }
  
  const length = title.length;
  
  if (length === 0) {
    return {
      status: "error",
      message: "Title tag is empty",
    };
  } else if (length > 60) {
    return {
      status: "warning",
      message: `Title length (${length} characters) exceeds recommendation`,
    };
  } else {
    return {
      status: "good",
    };
  }
}

export function analyzeDescription(description?: string): {
  status: "good" | "warning" | "error";
  message?: string;
} {
  if (!description) {
    return {
      status: "error",
      message: "Missing meta description",
    };
  }
  
  const length = description.length;
  
  if (length === 0) {
    return {
      status: "error",
      message: "Meta description is empty",
    };
  } else if (length < 70) {
    return {
      status: "warning",
      message: `Description is too short (${length} characters)`,
    };
  } else if (length > 160) {
    return {
      status: "warning",
      message: `Description length (${length} characters) exceeds recommendation`,
    };
  } else {
    return {
      status: "good",
    };
  }
}

export function getRecommendations(analysis: SEOAnalysis): string[] {
  const recommendations: string[] = [];

  // Title recommendations
  if (!analysis.title) {
    recommendations.push("Add a title tag with 50-60 characters");
  } else if (analysis.title.length > 60) {
    recommendations.push("Shorten your title tag to 50-60 characters");
  }

  // Description recommendations
  if (!analysis.description) {
    recommendations.push("Add a meta description with 120-160 characters");
  } else if (analysis.description.length < 70) {
    recommendations.push("Make your meta description more descriptive (aim for 120-160 characters)");
  } else if (analysis.description.length > 160) {
    recommendations.push("Shorten your meta description to 120-160 characters");
  }

  // Canonical recommendations
  if (!analysis.canonical) {
    recommendations.push("Add a canonical URL tag to prevent duplicate content issues");
  }

  // Open Graph recommendations
  if (!analysis.ogTags || Object.keys(analysis.ogTags).length === 0) {
    recommendations.push("Add Open Graph meta tags for better social media sharing");
  } else {
    const requiredOgTags = ["title", "description", "image", "url", "type"];
    const missingOgTags = requiredOgTags.filter(tag => !analysis.ogTags?.[tag]);
    
    if (missingOgTags.length > 0) {
      recommendations.push(`Add missing Open Graph tags: ${missingOgTags.map(t => `og:${t}`).join(", ")}`);
    }
    
    if (analysis.ogTags["image"] && (!analysis.ogTags["image:width"] || !analysis.ogTags["image:height"])) {
      recommendations.push("Add og:image:width and og:image:height for better social media rendering");
    }
  }

  // Twitter Card recommendations
  if (!analysis.twitterTags || Object.keys(analysis.twitterTags).length === 0) {
    recommendations.push("Add Twitter Card meta tags for better Twitter sharing");
  }

  return recommendations;
}
