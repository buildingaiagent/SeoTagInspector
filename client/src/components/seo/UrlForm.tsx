import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LinkIcon, X, AlertCircle } from "lucide-react";

interface UrlFormProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function UrlForm({ onAnalyze, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setUrlError("");

    // Basic validation
    if (!url.trim()) {
      setUrlError("Please enter a URL");
      return;
    }

    // Split URLs into an array
    const urls = url.trim().split('\n').map(u => u.trim()).filter(u => u !== '');

    // Validate each URL
    const invalidUrls = urls.filter(u => {
      try {
        let urlToValidate = u;
        if (!urlToValidate.startsWith("http://") && !urlToValidate.startsWith("https://")) {
          urlToValidate = `https://${urlToValidate}`;
        }
        const urlObj = new URL(urlToValidate);
        return !urlObj.hostname.includes('.');
      } catch (err) {
        return true;
      }
    });

    if (invalidUrls.length > 0) {
        setUrlError(`Please enter valid URLs.  The following are invalid: ${invalidUrls.join(', ')}`);
        return;
    }

    // Analyze each URL
    urls.forEach(u => {
        let urlToAnalyze = u;
        if (!urlToAnalyze.startsWith("http://") && !urlToAnalyze.startsWith("https://")) {
          urlToAnalyze = `https://${urlToAnalyze}`;
        }
        onAnalyze(urlToAnalyze);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <form onSubmit={validateAndSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <label htmlFor="url-input" className="sr-only">
              Website URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LinkIcon className="h-5 w-5 text-slate-400" />
              </div>
              <textarea
                id="url-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URLs (one per line) e.g.:
example.com
example.com/about
example.com/contact"
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2"
                disabled={isLoading}
                aria-invalid={!!urlError}
                aria-describedby={urlError ? "url-error" : undefined}
              />
              {url.length > 0 && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setUrl("")}
                    className="text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                    aria-label="Clear URL"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
            {urlError && (
              <p id="url-error" className="mt-2 text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{urlError}</span>
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isLoading || url.trim() === ""}
            className="sm:w-auto w-full h-12 px-6 bg-primary hover:bg-blue-600 transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </span>
            ) : (
              "Analyze Tags"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}