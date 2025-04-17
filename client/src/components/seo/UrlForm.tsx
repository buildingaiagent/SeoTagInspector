import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LinkIcon, X, AlertCircle } from "lucide-react";
import { useTranslation } from 'react-i18next'; //Import i18next hook

interface UrlFormProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export function UrlForm({ onAnalyze, isLoading }: UrlFormProps) {
  const { t } = useTranslation(); //Added translation hook
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setUrlError("");

    // Basic validation
    if (!url.trim()) {
      setUrlError(t("pleaseEnterUrl")); //Using translation for error message
      return;
    }

    // Try to create a URL object to validate
    try {
      // If URL doesn't have protocol, add https://
      let urlToValidate = url.trim();
      if (!urlToValidate.startsWith("http://") && !urlToValidate.startsWith("https://")) {
        urlToValidate = `https://${urlToValidate}`;
      }

      // Ensure it's a valid URL
      const urlObj = new URL(urlToValidate);

      // Make sure it has a valid hostname (at least one dot)
      if (!urlObj.hostname.includes('.')) {
        setUrlError(t("pleaseEnterValidDomain")); //Using translation for error message
        return;
      }

      // Use the sanitized URL for analysis
      onAnalyze(urlToValidate);
    } catch (err) {
      setUrlError(t("pleaseEnterValidUrl")); //Using translation for error message
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <form onSubmit={validateAndSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <label htmlFor="url-input" className="sr-only">
              {t("websiteUrl")} {/*Using translation for label*/}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LinkIcon className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                id="url-input"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t("enterWebsiteUrl")}
                className={`h-12 pl-10 pr-12 ${urlError ? 'border-red-300 focus-visible:ring-red-500 focus-visible:ring-offset-red-300' : 'focus-visible:ring-primary'}`}
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
                    aria-label={t("clearUrl")} {/*Using translation for aria-label*/}
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
                {t("analyzing")} {/*Using translation for analyzing*/}
              </span>
            ) : (
              t("analyzeTags") {/*Using translation for analyzeTags*/}
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}