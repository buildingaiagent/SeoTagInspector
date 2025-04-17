import { Card, CardContent } from "@/components/ui/card";

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

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Google Search Preview</h3>
      <Card className="bg-white border border-slate-200 max-w-2xl">
        <CardContent className="p-4">
          <div className="text-xl text-blue-700 font-medium mb-1 overflow-hidden text-ellipsis">
            {title || "No title tag found"}
          </div>
          <div className="text-green-700 text-sm mb-1">{displayUrl}</div>
          <div className="text-sm text-slate-700 line-clamp-2">
            {description || "No meta description found. Google may generate a description from the page content."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
