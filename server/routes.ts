import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { SEOAnalysis } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Route to analyze a website's SEO tags
  app.post("/api/analyze", async (req: Request, res: Response) => {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ message: "URL is required" });
      }

      let formattedUrl = url;
      // Add https:// if not present
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        formattedUrl = `https://${url}`;
      }

      // Fetch the HTML content from the URL
      try {
        const response = await fetch(formattedUrl, {
          headers: {
            "User-Agent": "SEO-Analyzer-Tool/1.0",
          },
        });

        if (!response.ok) {
          return res.status(response.status).json({
            message: `Failed to fetch website: ${response.statusText}`,
          });
        }

        // Make sure we get HTML content
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
          return res.status(415).json({
            message: `The URL does not return HTML content. Content type: ${contentType || 'unknown'}`,
          });
        }

        const html = await response.text();
        const analysis = analyzeHTML(html, formattedUrl);

        return res.status(200).json(analysis);
      } catch (fetchError) {
        console.error("Error fetching URL:", fetchError);
        return res.status(500).json({
          message: fetchError instanceof Error ? fetchError.message : "Failed to fetch website",
        });
      }
    } catch (error) {
      console.error("Error analyzing website:", error);
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to analyze website",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function analyzeHTML(html: string, url: string): SEOAnalysis {
  const $ = cheerio.load(html);
  const analysis: SEOAnalysis = { url };

  // Extract basic tags
  analysis.title = $("title").text();
  analysis.description = $('meta[name="description"]').attr("content");
  analysis.charset = $('meta[charset]').attr("charset") || $('meta[http-equiv="Content-Type"]').attr("content");
  analysis.viewport = $('meta[name="viewport"]').attr("content");
  analysis.language = $("html").attr("lang");
  analysis.canonical = $('link[rel="canonical"]').attr("href");
  analysis.robots = $('meta[name="robots"]').attr("content");

  // Extract Open Graph tags
  analysis.ogTags = {};
  $('meta[property^="og:"]').each((_, element) => {
    const property = $(element).attr("property");
    const content = $(element).attr("content");
    if (property && content) {
      analysis.ogTags![property.replace("og:", "")] = content;
    }
  });

  // Extract Twitter card tags
  analysis.twitterTags = {};
  $('meta[name^="twitter:"]').each((_, element) => {
    const name = $(element).attr("name");
    const content = $(element).attr("content");
    if (name && content) {
      analysis.twitterTags![name.replace("twitter:", "")] = content;
    }
  });

  // Extract other meta tags
  analysis.otherTags = {};
  $('meta').each((_, element) => {
    const name = $(element).attr("name");
    const content = $(element).attr("content");
    const property = $(element).attr("property");
    
    if (name && content && !name.startsWith("twitter:") && name !== "description" && name !== "viewport" && name !== "robots") {
      analysis.otherTags![name] = content;
    } else if (property && content && !property.startsWith("og:")) {
      analysis.otherTags![property] = content;
    }
  });

  // Calculate score and gather issues
  analysis.score = 0;
  analysis.issues = [];
  analysis.bestPractices = [];

  // Check title
  if (analysis.title) {
    const titleLength = analysis.title.length;
    if (titleLength > 0 && titleLength <= 60) {
      analysis.score += 15;
      analysis.bestPractices!.push({
        name: "Title Tag",
        implemented: true,
        description: "Title tag is present and has optimal length",
      });
    } else if (titleLength > 60) {
      analysis.score += 10;
      analysis.issues!.push({
        type: "warning",
        message: `Title length (${titleLength} characters) exceeds recommendation`,
        recommendation: "Keep title tags between 50-60 characters for optimal search engine display",
      });
      analysis.bestPractices!.push({
        name: "Title Tag",
        implemented: true,
        description: "Title tag is present but exceeds optimal length",
      });
    } else {
      analysis.issues!.push({
        type: "error",
        message: "Title tag is empty",
        recommendation: "Add a descriptive title between 50-60 characters",
      });
      analysis.bestPractices!.push({
        name: "Title Tag",
        implemented: false,
        description: "Title tag is empty",
      });
    }
  } else {
    analysis.issues!.push({
      type: "error",
      message: "Missing title tag",
      recommendation: "Add a descriptive title between 50-60 characters",
    });
    analysis.bestPractices!.push({
      name: "Title Tag",
      implemented: false,
      description: "Missing title tag",
    });
  }

  // Check description
  if (analysis.description) {
    const descLength = analysis.description.length;
    if (descLength > 0 && descLength <= 160) {
      analysis.score += 15;
      analysis.bestPractices!.push({
        name: "Meta Description",
        implemented: true,
        description: "Meta description is present and has optimal length",
      });
    } else if (descLength > 160) {
      analysis.score += 10;
      analysis.issues!.push({
        type: "warning",
        message: `Description length (${descLength} characters) exceeds recommendation`,
        recommendation: "Keep description tags between 120-160 characters for optimal display",
      });
      analysis.bestPractices!.push({
        name: "Meta Description",
        implemented: true,
        description: "Meta description is present but exceeds optimal length",
      });
    } else {
      analysis.issues!.push({
        type: "warning",
        message: "Description tag is too short",
        recommendation: "Add a descriptive meta description between 120-160 characters",
      });
      analysis.bestPractices!.push({
        name: "Meta Description",
        implemented: true,
        description: "Meta description is present but too short",
      });
    }
  } else {
    analysis.issues!.push({
      type: "error",
      message: "Missing meta description",
      recommendation: "Add a descriptive meta description between 120-160 characters",
    });
    analysis.bestPractices!.push({
      name: "Meta Description",
      implemented: false,
      description: "Missing meta description",
    });
  }

  // Check viewport
  if (analysis.viewport) {
    analysis.score += 10;
    analysis.bestPractices!.push({
      name: "Viewport Meta Tag",
      implemented: true,
      description: "Responsive viewport meta tag is present",
    });
  } else {
    analysis.issues!.push({
      type: "error",
      message: "Missing viewport meta tag",
      recommendation: "Add viewport meta tag for responsive design: <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
    });
    analysis.bestPractices!.push({
      name: "Viewport Meta Tag",
      implemented: false,
      description: "Missing viewport meta tag for responsive design",
    });
  }

  // Check charset
  if (analysis.charset) {
    analysis.score += 5;
    analysis.bestPractices!.push({
      name: "Character Encoding",
      implemented: true,
      description: "Character encoding is specified",
    });
  } else {
    analysis.issues!.push({
      type: "warning",
      message: "Missing character encoding",
      recommendation: "Add charset meta tag: <meta charset=\"UTF-8\">",
    });
    analysis.bestPractices!.push({
      name: "Character Encoding",
      implemented: false,
      description: "Character encoding is not specified",
    });
  }

  // Check canonical URL
  if (analysis.canonical) {
    analysis.score += 10;
    analysis.bestPractices!.push({
      name: "Canonical URL",
      implemented: true,
      description: "Canonical URL is specified",
    });
  } else {
    analysis.issues!.push({
      type: "error",
      message: "Missing canonical tag",
      recommendation: "Add a canonical tag to prevent duplicate content issues: <link rel=\"canonical\" href=\"" + url + "\">",
    });
    analysis.bestPractices!.push({
      name: "Canonical URL",
      implemented: false,
      description: "Missing canonical URL",
    });
  }

  // Check language
  if (analysis.language) {
    analysis.score += 5;
    analysis.bestPractices!.push({
      name: "Language Attribute",
      implemented: true,
      description: "HTML language attribute is specified",
    });
  } else {
    analysis.issues!.push({
      type: "warning",
      message: "Missing language attribute",
      recommendation: "Add language attribute to the HTML tag: <html lang=\"en\">",
    });
    analysis.bestPractices!.push({
      name: "Language Attribute",
      implemented: false,
      description: "HTML language attribute is not specified",
    });
  }

  // Check Open Graph tags
  if (Object.keys(analysis.ogTags || {}).length > 0) {
    analysis.score += 10;
    let hasAllRequiredOgTags = true;
    
    // Check for essential OG tags
    const essentialOgTags = ["title", "description", "image", "url", "type"];
    for (const tag of essentialOgTags) {
      if (!analysis.ogTags![tag]) {
        hasAllRequiredOgTags = false;
        analysis.issues!.push({
          type: "warning",
          message: `Missing og:${tag} meta tag`,
          recommendation: `Add og:${tag} meta tag for better social media sharing`,
        });
      }
    }

    // Check for OG image dimensions
    if (analysis.ogTags!["image"] && (!analysis.ogTags!["image:width"] || !analysis.ogTags!["image:height"])) {
      hasAllRequiredOgTags = false;
      analysis.issues!.push({
        type: "warning",
        message: "Missing og:image dimensions (og:image:width, og:image:height)",
        recommendation: "Add image dimensions to improve rendering on social platforms",
      });
    }

    analysis.bestPractices!.push({
      name: "Open Graph Tags",
      implemented: true,
      description: hasAllRequiredOgTags 
        ? "All essential Open Graph tags are present" 
        : "Some Open Graph tags are present but missing important ones",
    });
  } else {
    analysis.issues!.push({
      type: "error",
      message: "Missing Open Graph meta tags",
      recommendation: "Add Open Graph meta tags for better social media sharing",
    });
    analysis.bestPractices!.push({
      name: "Open Graph Tags",
      implemented: false,
      description: "Missing Open Graph meta tags",
    });
  }

  // Check Twitter card tags
  if (Object.keys(analysis.twitterTags || {}).length > 0) {
    analysis.score += 10;
    let hasAllRequiredTwitterTags = true;
    
    // Check for essential Twitter tags
    const essentialTwitterTags = ["card", "title", "description"];
    for (const tag of essentialTwitterTags) {
      if (!analysis.twitterTags![tag]) {
        hasAllRequiredTwitterTags = false;
        analysis.issues!.push({
          type: "warning",
          message: `Missing twitter:${tag} meta tag`,
          recommendation: `Add twitter:${tag} meta tag for better Twitter sharing`,
        });
      }
    }

    analysis.bestPractices!.push({
      name: "Twitter Card Tags",
      implemented: true,
      description: hasAllRequiredTwitterTags 
        ? "All essential Twitter Card tags are present" 
        : "Some Twitter Card tags are present but missing important ones",
    });
  } else {
    analysis.issues!.push({
      type: "warning",
      message: "Missing Twitter Card meta tags",
      recommendation: "Add Twitter Card meta tags for better Twitter sharing",
    });
    analysis.bestPractices!.push({
      name: "Twitter Card Tags",
      implemented: false,
      description: "Missing Twitter Card meta tags",
    });
  }

  // Check robots
  if (analysis.robots) {
    if (analysis.robots.includes("noindex") || analysis.robots.includes("nofollow")) {
      analysis.issues!.push({
        type: "warning",
        message: `Robots meta tag is blocking search engines: ${analysis.robots}`,
        recommendation: "Remove noindex/nofollow if you want search engines to index this page",
      });
      analysis.bestPractices!.push({
        name: "Robots Meta Tag",
        implemented: true,
        description: "Robots meta tag is present but blocking search engines",
      });
    } else {
      analysis.score += 5;
      analysis.bestPractices!.push({
        name: "Robots Meta Tag",
        implemented: true,
        description: "Robots meta tag is properly configured",
      });
    }
  }

  // Normalize score to 100 scale
  analysis.score = Math.min(100, analysis.score * 1.25);
  
  return analysis;
}
