import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
    
    // Try to create a URL object to validate
    try {
      // If URL doesn't have protocol, add https://
      let urlToValidate = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        urlToValidate = `https://${url}`;
      }
      
      new URL(urlToValidate);
      onAnalyze(url);
    } catch (err) {
      setUrlError("Please enter a valid URL (e.g., example.com)");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <form onSubmit={validateAndSubmit}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow">
            <label htmlFor="url-input" className="sr-only">
              Website URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-11.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zm1.25 7a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h.5v-4h-.5a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 .5.5v4.5h.5a.5.5 0 0 1 .5.5z"/>
                </svg>
              </div>
              <Input
                id="url-input"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g., example.com)"
                className={`pl-10 pr-12 py-6 ${urlError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              />
              {url.length > 0 && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setUrl("")}
                    className="text-slate-400 hover:text-slate-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {urlError && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {urlError}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isLoading || url.trim() === ""}
            className="md:w-auto w-full px-6 py-6 bg-primary hover:bg-blue-600 transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center">
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
