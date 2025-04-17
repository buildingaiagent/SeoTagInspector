import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle, Copy } from "lucide-react";
import { useState } from "react";

interface TagsListProps {
  title?: string;
  description?: string;
  charset?: string;
  viewport?: string;
  canonical?: string;
  language?: string;
  robots?: string;
  ogTags?: Record<string, string>;
  twitterTags?: Record<string, string>;
  otherTags?: Record<string, string>;
}

interface TagItemProps {
  name: string;
  content: string | undefined;
  status: "good" | "warning" | "error";
  recommendation?: string;
}

function TagItem({ name, content, status, recommendation }: TagItemProps) {
  const [copied, setCopied] = useState(false);
  
  const statusClasses = {
    good: "border-l-green-500",
    warning: "border-l-amber-500",
    error: "border-l-red-500",
  };

  const statusIcons = {
    good: <CheckCircle className="h-4 w-4 text-green-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    error: <XCircle className="h-4 w-4 text-red-500" />
  };

  const statusLabels = {
    good: "Good",
    warning: "Warning",
    error: "Missing"
  };

  const statusColors = {
    good: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800"
  };

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`border-l-[3px] ${statusClasses[status]} pl-3 mb-4 bg-white rounded-r-md shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-center gap-2 mb-2 p-2">
        <div className="flex items-center gap-2">
          {statusIcons[status]}
          <h4 className="font-medium text-slate-700">{name}</h4>
        </div>
        <Badge className={`${statusColors[status]} cursor-default`}>
          {statusLabels[status]}
        </Badge>
      </div>
      <div className="relative group">
        <code className="block font-mono text-sm bg-slate-50 p-3 rounded-md overflow-x-auto border border-slate-100 break-all">
          {content || `No ${name.toLowerCase()} tag found`}
        </code>
        {content && (
          <button 
            onClick={handleCopy} 
            className="absolute right-2 top-2 bg-white p-1 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Copy to clipboard"
          >
            <Copy className="h-4 w-4 text-slate-500" />
          </button>
        )}
        {copied && (
          <div className="absolute right-2 top-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            Copied!
          </div>
        )}
      </div>
      {recommendation && (
        <p className="text-sm text-amber-700 mt-2 mb-1 px-2 flex items-start gap-1.5">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>{recommendation}</span>
        </p>
      )}
    </div>
  );
}

export default function TagsList({
  title,
  description,
  charset,
  viewport,
  canonical,
  language,
  robots,
  ogTags,
  twitterTags,
  otherTags,
}: TagsListProps) {
  const [activeSection, setActiveSection] = useState<string>("core");
  
  // Calculate tag counts for categories
  const coreTags = [
    {exists: !!title, name: "Title"},
    {exists: !!description, name: "Description"},
    {exists: !!viewport, name: "Viewport"},
    {exists: !!charset, name: "Charset"},
    {exists: !!canonical, name: "Canonical"},
    {exists: !!language, name: "Language"},
    {exists: !!robots, name: "Robots"}
  ];
  
  const coreCount = coreTags.filter(tag => tag.exists).length;
  const ogCount = ogTags ? Object.keys(ogTags).length : 0;
  const twitterCount = twitterTags ? Object.keys(twitterTags).length : 0;
  const otherCount = otherTags ? Object.keys(otherTags).length : 0;
  const missingCount = coreTags.filter(tag => !tag.exists).length + 
    (!ogTags || Object.keys(ogTags).length === 0 ? 1 : 0) + 
    (!twitterTags || Object.keys(twitterTags).length === 0 ? 1 : 0);

  // Don't show missing count if all required tags are present
  const effectiveMissingCount = coreTags.every(tag => tag.exists) && 
    ogTags && Object.keys(ogTags).length > 0 && 
    twitterTags && Object.keys(twitterTags).length > 0 ? 0 : missingCount;
  
  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-1 sm:p-2">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSection("core")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                activeSection === "core" 
                  ? "bg-primary text-white" 
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Core Tags
              <span className="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full">
                {coreCount}
              </span>
            </button>
            
            {ogCount > 0 && (
              <button
                onClick={() => setActiveSection("og")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  activeSection === "og" 
                    ? "bg-primary text-white" 
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Open Graph
                <span className="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full">
                  {ogCount}
                </span>
              </button>
            )}
            
            {twitterCount > 0 && (
              <button
                onClick={() => setActiveSection("twitter")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  activeSection === "twitter" 
                    ? "bg-primary text-white" 
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Twitter Card
                <span className="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full">
                  {twitterCount}
                </span>
              </button>
            )}
            
            {otherCount > 0 && (
              <button
                onClick={() => setActiveSection("other")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  activeSection === "other" 
                    ? "bg-primary text-white" 
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Other
                <span className="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full">
                  {otherCount}
                </span>
              </button>
            )}
            
            {effectiveMissingCount > 0 && (
              <button
                onClick={() => setActiveSection("missing")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  activeSection === "missing" 
                    ? "bg-red-500 text-white" 
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                Missing Tags
                <span className="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full">
                  {missingCount}
                </span>
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content Sections */}
      {activeSection === "core" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Core Meta Tags</h3>
          
          {title && (
            <TagItem 
              name="Title" 
              content={`<title>${title}</title>`}
              status="good"
            />
          )}
          
          {description && (
            <TagItem 
              name="Meta Description" 
              content={`<meta name="description" content="${description}">`}
              status="good"
            />
          )}
          
          {viewport && (
            <TagItem 
              name="Viewport" 
              content={`<meta name="viewport" content="${viewport}">`}
              status="good"
            />
          )}
          
          {charset && (
            <TagItem 
              name="Charset" 
              content={`<meta charset="${charset}">`}
              status="good"
            />
          )}

          {canonical && (
            <TagItem
              name="Canonical URL"
              content={`<link rel="canonical" href="${canonical}">`}
              status="good"
            />
          )}

          {language && (
            <TagItem
              name="Language Attribute"
              content={`<html lang="${language}">`}
              status="good"
            />
          )}

          {robots && (
            <TagItem
              name="Robots"
              content={`<meta name="robots" content="${robots}">`}
              status={robots.includes("noindex") ? "warning" : "good"}
              recommendation={robots.includes("noindex") ? "This page is being blocked from search engines" : undefined}
            />
          )}

          {coreTags.every(tag => !tag.exists) && (
            <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-500">No core meta tags found on this page</p>
            </div>
          )}
        </div>
      )}
      
      {activeSection === "og" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Open Graph Tags</h3>
          
          {ogTags && Object.keys(ogTags).length > 0 ? (
            Object.entries(ogTags).map(([key, value]) => (
              <TagItem
                key={`og-${key}`}
                name={`og:${key}`}
                content={`<meta property="og:${key}" content="${value}">`}
                status="good"
              />
            ))
          ) : (
            <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-500">No Open Graph tags found on this page</p>
            </div>
          )}

          {ogTags && ogTags["image"] && !ogTags["image:width"] && (
            <TagItem
              name="og:image:width"
              content={`<meta property="og:image:width" content="1200">`}
              status="warning"
              recommendation="Add image dimensions for better social media display"
            />
          )}

          {ogTags && ogTags["image"] && !ogTags["image:height"] && (
            <TagItem
              name="og:image:height"
              content={`<meta property="og:image:height" content="630">`}
              status="warning"
              recommendation="Add image dimensions for better social media display"
            />
          )}
        </div>
      )}
      
      {activeSection === "twitter" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Twitter Card Tags</h3>
          
          {twitterTags && Object.keys(twitterTags).length > 0 ? (
            Object.entries(twitterTags).map(([key, value]) => (
              <TagItem
                key={`twitter-${key}`}
                name={`twitter:${key}`}
                content={`<meta name="twitter:${key}" content="${value}">`}
                status="good"
              />
            ))
          ) : (
            <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-500">No Twitter Card tags found on this page</p>
            </div>
          )}
        </div>
      )}
      
      {activeSection === "other" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Other Meta Tags</h3>
          
          {otherTags && Object.keys(otherTags).length > 0 ? (
            Object.entries(otherTags).map(([key, value]) => (
              <TagItem
                key={`other-${key}`}
                name={key}
                content={`<meta name="${key}" content="${value}">`}
                status="good"
              />
            ))
          ) : (
            <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-500">No additional meta tags found on this page</p>
            </div>
          )}
        </div>
      )}

      {activeSection === "missing" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Missing Tags</h3>
          
          {!title && (
            <TagItem
              name="Title"
              content={`<title>Your page title here</title>`}
              status="error"
            />
          )}
          
          {!description && (
            <TagItem
              name="Meta Description"
              content={`<meta name="description" content="A brief description of your page content">`}
              status="error"
            />
          )}
          
          {!viewport && (
            <TagItem
              name="Viewport"
              content={`<meta name="viewport" content="width=device-width, initial-scale=1.0">`}
              status="error"
            />
          )}
          
          {!charset && (
            <TagItem
              name="Charset"
              content={`<meta charset="UTF-8">`}
              status="warning"
            />
          )}
          
          {!canonical && (
            <TagItem
              name="Canonical URL"
              content={`<link rel="canonical" href="https://example.com/your-page-path">`}
              status="error"
              recommendation="Important for SEO to prevent duplicate content issues"
            />
          )}
          
          {!language && (
            <TagItem
              name="Language Attribute"
              content={`<html lang="en">`}
              status="warning"
            />
          )}
          
          {(!ogTags || Object.keys(ogTags).length === 0) && (
            <TagItem
              name="Open Graph Tags"
              content={`<meta property="og:title" content="Your title">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">`}
              status="error"
              recommendation="Add Open Graph tags for better social media sharing"
            />
          )}
          
          {(!twitterTags || Object.keys(twitterTags).length === 0) && (
            <TagItem
              name="Twitter Card Tags"
              content={`<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your title">
<meta name="twitter:description" content="Your description">
<meta name="twitter:image" content="https://example.com/image.jpg">`}
              status="warning"
              recommendation="Add Twitter Card tags for better Twitter sharing"
            />
          )}

          {(title && description && viewport && charset && canonical && language && 
            ogTags && Object.keys(ogTags).length > 0 && 
            twitterTags && Object.keys(twitterTags).length > 0) && (
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-green-700 flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>No missing tags found! Great job!</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
