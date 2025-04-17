import { Card } from "@/components/ui/card";
import { Image, Info } from "lucide-react";

interface SocialPreviewsProps {
  title?: string;
  description?: string;
  url: string;
  ogTags?: Record<string, string>;
  twitterTags?: Record<string, string>;
}

export default function SocialPreviews({ 
  title, 
  description, 
  url, 
  ogTags, 
  twitterTags 
}: SocialPreviewsProps) {
  // Get domain for display
  const getDomain = (rawUrl: string) => {
    try {
      const urlObj = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
      return urlObj.hostname;
    } catch (e) {
      return rawUrl;
    }
  };

  const domain = getDomain(url);
  
  // Get appropriate titles and descriptions for previews
  const facebookTitle = ogTags?.["title"] || title || "No title available";
  const facebookDesc = ogTags?.["description"] || description || "No description available";
  const twitterTitle = twitterTags?.["title"] || ogTags?.["title"] || title || "No title available";
  const twitterDesc = twitterTags?.["description"] || ogTags?.["description"] || description || "No description available";
  
  // Check if OG image is available
  const hasOgImage = ogTags?.["image"];
  const hasTwitterImage = twitterTags?.["image"];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium text-slate-800">Social Media Previews</h3>
        <div className="group relative">
          <button 
            type="button"
            aria-label="Info about Social Media Previews"
            className="text-slate-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
          >
            <Info className="h-4 w-4" />
          </button>
          <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-white shadow-lg rounded-md border border-slate-200 text-xs text-slate-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50">
            These previews show how your page would appear when shared on social media platforms, based on Open Graph and Twitter Card meta tags.
          </div>
        </div>
      </div>
      
      {/* Facebook/LinkedIn Card */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <h4 className="text-md font-medium text-slate-700">Facebook / LinkedIn</h4>
          {!hasOgImage && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              Missing og:image
            </span>
          )}
        </div>
        <Card className="bg-white border border-slate-200 overflow-hidden max-w-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="h-40 sm:h-52 bg-gradient-to-r from-slate-100 to-blue-50 flex items-center justify-center">
            <div className="text-slate-500 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-200">
                <Image className="h-6 w-6" />
              </div>
              <span className="text-sm mt-2">Preview image would appear here</span>
              {!hasOgImage && (
                <span className="text-xs mt-1 text-amber-600">Add og:image tag for better sharing</span>
              )}
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{domain}</div>
            <h3 className="font-bold text-slate-800 mb-2 line-clamp-1">{facebookTitle}</h3>
            <p className="text-sm text-slate-600 mb-1 line-clamp-2">{facebookDesc}</p>
          </div>
        </Card>
      </div>

      {/* Twitter/X Card */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <h4 className="text-md font-medium text-slate-700">Twitter / X</h4>
          {!hasTwitterImage && !hasOgImage && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              Missing twitter:image
            </span>
          )}
        </div>
        <Card className="bg-white border border-slate-200 overflow-hidden max-w-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="h-40 sm:h-52 bg-gradient-to-r from-slate-100 to-sky-50 flex items-center justify-center rounded-t-lg">
            <div className="text-slate-500 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-200">
                <Image className="h-6 w-6" />
              </div>
              <span className="text-sm mt-2">Preview image would appear here</span>
              {!hasTwitterImage && !hasOgImage && (
                <span className="text-xs mt-1 text-amber-600">Add twitter:image tag for better sharing</span>
              )}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-slate-800 mb-2 line-clamp-1">{twitterTitle}</h3>
            <p className="text-sm text-slate-600 mb-2 line-clamp-2">{twitterDesc}</p>
            <div className="text-xs text-slate-500">{domain}</div>
          </div>
        </Card>
      </div>
      
      {(!ogTags || !twitterTags) && (
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-700 flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p>
              {!ogTags && !twitterTags 
                ? "Your page is missing both Open Graph and Twitter Card meta tags." 
                : !ogTags 
                  ? "Your page is missing Open Graph meta tags." 
                  : "Your page is missing Twitter Card meta tags."}
            </p>
            <p className="mt-1 text-xs">
              These tags are essential for controlling how your content appears when shared on social media.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
