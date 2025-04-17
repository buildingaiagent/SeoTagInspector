import { Card } from "@/components/ui/card";
import { Image } from "lucide-react";

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
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Social Media Previews</h3>
      
      <div className="space-y-3">
        <h4 className="text-md font-medium text-slate-700">Facebook / LinkedIn</h4>
        <Card className="bg-white border border-slate-200 overflow-hidden max-w-lg shadow-sm">
          <div className="h-52 bg-slate-200 flex items-center justify-center">
            <div className="text-slate-500 flex flex-col items-center">
              <Image className="h-8 w-8" />
              <span className="text-sm mt-2">Preview image would appear here</span>
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{domain}</div>
            <h3 className="font-bold text-slate-800 mb-2">{facebookTitle}</h3>
            <p className="text-sm text-slate-600 mb-2">{facebookDesc}</p>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        <h4 className="text-md font-medium text-slate-700">Twitter / X</h4>
        <Card className="bg-white border border-slate-200 overflow-hidden max-w-lg shadow-sm">
          <div className="h-52 bg-slate-200 flex items-center justify-center">
            <div className="text-slate-500 flex flex-col items-center">
              <Image className="h-8 w-8" />
              <span className="text-sm mt-2">Preview image would appear here</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-slate-800 mb-2">{twitterTitle}</h3>
            <p className="text-sm text-slate-600 mb-2">{twitterDesc}</p>
            <div className="text-xs text-slate-500">{domain}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
