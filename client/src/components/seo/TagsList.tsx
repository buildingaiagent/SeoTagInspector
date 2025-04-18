import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle, Copy } from "lucide-react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
    good: t('good'),
    warning: t('warning'),
    error: t('missing')
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
            {t('complete')}!
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
  const { t } = useTranslation();
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
  const missingCoreTags = coreTags.filter(tag => !tag.exists).length;
  const missingOgTags = (!ogTags || Object.keys(ogTags).length === 0) ? 1 : 0;
  const missingTwitterTags = (!twitterTags || Object.keys(twitterTags).length === 0) ? 1 : 0;
  const missingCount = missingCoreTags + missingOgTags + missingTwitterTags;

  // Only show missing count if there are actually missing tags
  const effectiveMissingCount = missingCount;
  
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
              {t('coreTags')}
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
                {t('openGraphTags')}
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
                {t('twitterCardTags')}
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
                {t('other')}
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
                {t('missingTags')}
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
          <h3 className="text-lg font-medium text-slate-800">{t('coreMetaTags')}</h3>
          
          {title && (
            <TagItem 
              name={t('title')} 
              content={`<title>${title}</title>`}
              status="good"
            />
          )}
          
          {description && (
            <TagItem 
              name={t('metaDescription')} 
              content={`<meta name="description" content="${description}">`}
              status="good"
            />
          )}
          
          {viewport && (
            <TagItem 
              name={t('viewport')} 
              content={`<meta name="viewport" content="${viewport}">`}
              status="good"
            />
          )}
          
          {charset && (
            <TagItem 
              name={t('charset')} 
              content={`<meta charset="${charset}">`}
              status="good"
            />
          )}

          {canonical && (
            <TagItem
              name={t('canonicalURL')}
              content={`<link rel="canonical" href="${canonical}">`}
              status="good"
            />
          )}

          {language && (
            <TagItem
              name={t('language')}
              content={`<html lang="${language}">`}
              status="good"
            />
          )}

          {robots && (
            <TagItem
              name={t('robots')}
              content={`<meta name="robots" content="${robots}">`}
              status={robots.includes("noindex") ? "warning" : "good"}
              recommendation={robots.includes("noindex") ? t('blockedFromSearch') : undefined}
            />
          )}

          {coreTags.every(tag => !tag.exists) && (
            <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-500">{t('noCoreTags')}</p>
            </div>
          )}
        </div>
      )}
      
      {activeSection === "og" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">{t('openGraphTags')}</h3>
          
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
              <p className="text-slate-500">{t('noOgTags')}</p>
            </div>
          )}

          {ogTags && ogTags["image"] && !ogTags["image:width"] && (
            <TagItem
              name="og:image:width"
              content={`<meta property="og:image:width" content="1200">`}
              status="warning"
              recommendation={t('addImageDimensions')}
            />
          )}

          {ogTags && ogTags["image"] && !ogTags["image:height"] && (
            <TagItem
              name="og:image:height"
              content={`<meta property="og:image:height" content="630">`}
              status="warning"
              recommendation={t('addImageDimensions')}
            />
          )}
        </div>
      )}
      
      {activeSection === "twitter" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">{t('twitterCardTags')}</h3>
          
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
              <p className="text-slate-500">{t('noTwitterTags')}</p>
            </div>
          )}
        </div>
      )}
      
      {activeSection === "other" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">{t('other')}</h3>
          
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
              <p className="text-slate-500">{t('noOtherTags')}</p>
            </div>
          )}
        </div>
      )}

      {activeSection === "missing" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">{t('missingTags')}</h3>
          
          {!title && (
            <TagItem
              name={t('title')}
              content={`<title>Your page title here</title>`}
              status="error"
            />
          )}
          
          {!description && (
            <TagItem
              name={t('metaDescription')}
              content={`<meta name="description" content="A brief description of your page content">`}
              status="error"
            />
          )}
          
          {!viewport && (
            <TagItem
              name={t('viewport')}
              content={`<meta name="viewport" content="width=device-width, initial-scale=1.0">`}
              status="error"
            />
          )}
          
          {!charset && (
            <TagItem
              name={t('charset')}
              content={`<meta charset="UTF-8">`}
              status="warning"
            />
          )}
          
          {!canonical && (
            <TagItem
              name={t('canonicalURL')}
              content={`<link rel="canonical" href="https://example.com/your-page-path">`}
              status="error"
              recommendation={t('duplicateContentIssues')}
            />
          )}
          
          {!language && (
            <TagItem
              name={t('language')}
              content={`<html lang="en">`}
              status="warning"
            />
          )}
          
          {(!ogTags || Object.keys(ogTags).length === 0) && (
            <TagItem
              name={t('openGraphTags')}
              content={`<meta property="og:title" content="Your title">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">`}
              status="error"
              recommendation={t('addOgTags')}
            />
          )}
          
          {(!twitterTags || Object.keys(twitterTags).length === 0) && (
            <TagItem
              name={t('twitterCardTags')}
              content={`<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your title">
<meta name="twitter:description" content="Your description">
<meta name="twitter:image" content="https://example.com/image.jpg">`}
              status="warning"
              recommendation={t('addTwitterTags')}
            />
          )}

          {(title && description && viewport && charset && canonical && language && 
            ogTags && Object.keys(ogTags).length > 0 && 
            twitterTags && Object.keys(twitterTags).length > 0) && (
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-green-700 flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>{t('allChecksPassed')}!</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
