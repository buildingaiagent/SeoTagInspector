import { Badge } from "@/components/ui/badge";

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
  const statusClasses = {
    good: "border-l-green-500",
    warning: "border-l-amber-500",
    error: "border-l-red-500",
  };

  const statusBadge = {
    good: <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Good</Badge>,
    warning: <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Warning</Badge>,
    error: <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Missing</Badge>,
  };

  return (
    <div className={`border-l-[3px] ${statusClasses[status]} pl-3 mb-4`}>
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-medium text-slate-700">{name}</h4>
        {statusBadge[status]}
      </div>
      <code className="block font-mono text-sm bg-slate-50 p-3 rounded-md overflow-x-auto">
        {content || `No ${name.toLowerCase()} tag found`}
      </code>
      {recommendation && <p className="text-sm text-amber-700 mt-1">{recommendation}</p>}
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
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Core Meta Tags</h3>
        
        <TagItem 
          name="Title" 
          content={title ? `<title>${title}</title>` : undefined}
          status={title ? "good" : "error"}
        />
        
        <TagItem 
          name="Meta Description" 
          content={description ? `<meta name="description" content="${description}">` : undefined}
          status={description ? "good" : "error"}
        />
        
        <TagItem 
          name="Viewport" 
          content={viewport ? `<meta name="viewport" content="${viewport}">` : undefined}
          status={viewport ? "good" : "error"}
        />
        
        <TagItem 
          name="Charset" 
          content={charset ? `<meta charset="${charset}">` : undefined}
          status={charset ? "good" : "warning"}
        />

        <TagItem
          name="Canonical URL"
          content={canonical ? `<link rel="canonical" href="${canonical}">` : undefined}
          status={canonical ? "good" : "error"}
        />

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
      </div>
      
      {(ogTags && Object.keys(ogTags).length > 0) && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Open Graph Tags</h3>
          
          {Object.entries(ogTags).map(([key, value]) => (
            <TagItem
              key={`og-${key}`}
              name={`og:${key}`}
              content={`<meta property="og:${key}" content="${value}">`}
              status="good"
            />
          ))}

          {!ogTags["image:width"] && ogTags["image"] && (
            <TagItem
              name="og:image:width"
              content={`<meta property="og:image:width" content="1200">`}
              status="warning"
              recommendation="Add image dimensions for better social media display"
            />
          )}

          {!ogTags["image:height"] && ogTags["image"] && (
            <TagItem
              name="og:image:height"
              content={`<meta property="og:image:height" content="630">`}
              status="warning"
              recommendation="Add image dimensions for better social media display"
            />
          )}
        </div>
      )}
      
      {(twitterTags && Object.keys(twitterTags).length > 0) && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Twitter Card Tags</h3>
          
          {Object.entries(twitterTags).map(([key, value]) => (
            <TagItem
              key={`twitter-${key}`}
              name={`twitter:${key}`}
              content={`<meta name="twitter:${key}" content="${value}">`}
              status="good"
            />
          ))}
        </div>
      )}
      
      {(otherTags && Object.keys(otherTags).length > 0) && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Other Meta Tags</h3>
          
          {Object.entries(otherTags).map(([key, value]) => (
            <TagItem
              key={`other-${key}`}
              name={key}
              content={`<meta name="${key}" content="${value}">`}
              status="good"
            />
          ))}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Missing Tags</h3>
        
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
            content={`<link rel="canonical" href="${document.location.origin}/your-page-path">`}
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
      </div>
    </div>
  );
}
