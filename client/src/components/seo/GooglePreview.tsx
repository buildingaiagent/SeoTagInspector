import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

interface GooglePreviewProps {
  title?: string;
  description?: string;
  url: string;
}

export default function GooglePreview({ title, description, url }: GooglePreviewProps) {
  // Format URL for display
  const formatUrl = (rawUrl: string) => {
    try {
      const urlObj = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
      return urlObj.hostname + urlObj.pathname;
    } catch (e) {
      return rawUrl;
    }
  };

  const displayUrl = formatUrl(url);
  const titlePlaceholder = "No title tag found";
  const descriptionPlaceholder = "No meta description found. Google may generate a description from the page content.";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium text-slate-800">Google Search Preview</h3>
        <div className="group relative">
          <button 
            type="button"
            aria-label="Info about Google Search Preview"
            className="text-slate-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
          >
            <Info className="h-4 w-4" />
          </button>
          <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-white shadow-lg rounded-md border border-slate-200 text-xs text-slate-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50">
            This is how your page might appear in Google search results, based on your title and meta description tags.
          </div>
        </div>
      </div>
      
      <Card className="bg-white border border-slate-200 shadow-sm max-w-2xl overflow-hidden">
        <CardContent className="p-4">
          <div className="text-lg sm:text-xl text-blue-700 hover:underline cursor-pointer font-medium mb-2 overflow-hidden text-ellipsis">
            {title || titlePlaceholder}
          </div>
          <div className="text-green-700 text-xs sm:text-sm mb-2">{displayUrl}</div>
          <div className="text-xs sm:text-sm text-slate-700 line-clamp-2">
            {description || descriptionPlaceholder}
          </div>
          
          {(!title || !description) && (
            <div className="mt-3 flex items-start gap-2 p-2 bg-amber-50 border border-amber-100 rounded-md">
              <Info className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                {!title && !description 
                  ? "Your page is missing both title and meta description tags." 
                  : !title 
                    ? "Your page is missing a title tag." 
                    : "Your page is missing a meta description tag."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
