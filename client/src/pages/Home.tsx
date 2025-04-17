import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import UrlForm from "@/components/seo/UrlForm";
import AnalysisResults from "@/components/seo/AnalysisResults";
import { useQuery } from "@tanstack/react-query";
import { SEOAnalysis } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { AlertCircle, Search, Share, CheckCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [url, setUrl] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const { toast } = useToast();

  const {
    data: analysis,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<SEOAnalysis>({
    queryKey: ["/api/analyze"],
    enabled: false,
    retry: 1,
  });

  const handleAnalyze = async (websiteUrl: string) => {
    setUrl(websiteUrl);
    setAnalyzed(false);
    
    try {
      // Show a progress toast
      toast({
        title: "Analyzing Website",
        description: "Fetching and parsing the website content...",
      });
      
      // Make the API request - ensure we get the response as JSON
      const response = await apiRequest("POST", "/api/analyze", { url: websiteUrl });
      const data = await response.json();
      
      // Instead of refetching, use the data we just got
      // This avoids the JSON parsing error since we handle it here
      queryClient.setQueryData(["/api/analyze"], data);
      setAnalyzed(true);
      
      // Success toast
      toast({
        title: "Analysis Complete",
        description: "Website analysis completed successfully.",
        variant: "default",
      });
    } catch (err) {
      console.error("Error in API request:", err);
      
      // Determine a user-friendly error message
      let errorMessage = "Failed to analyze website";
      
      if (err instanceof Error) {
        const message = err.message;
        
        if (message.includes("Failed to fetch")) {
          errorMessage = "Could not reach the website. Please check the URL and try again.";
        } else if (message.includes("content type")) {
          errorMessage = "The URL doesn't return HTML content. Please try a different URL.";
        } else if (message.includes("CORS") || message.includes("cross-origin")) {
          errorMessage = "Website blocks external access. Try a different website.";
        } else if (message.includes("Unexpected token")) {
          errorMessage = "Received invalid data. The website may be blocking our analyzer.";
        } else {
          errorMessage = message;
        }
      }
      
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: errorMessage,
      });
    }
  };

  const handleReset = () => {
    setUrl("");
    setAnalyzed(false);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen font-sans text-slate-700">
      <div className="mx-auto container px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
                SEO Tag Analyzer
              </h1>
              <p className="text-slate-500 mt-1">Visualize and analyze your website's meta tags</p>
            </div>
            <Button 
              onClick={handleReset} 
              variant="outline"
              size="sm"
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          <UrlForm 
            onAnalyze={handleAnalyze} 
            isLoading={isLoading || isFetching} 
          />
        </header>

        {(isLoading || isFetching) && (
          <div className="flex flex-col items-center justify-center py-10 sm:py-12">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-primary rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-medium text-slate-700 mb-2">Analyzing Meta Tags</h2>
            <p className="text-slate-500 text-center max-w-md">
              Fetching and parsing the HTML from the website. This may take a moment depending on the site's size.
            </p>
          </div>
        )}

        {isError && !isLoading && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-lg shadow-sm mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center sm:justify-start">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-red-800 mb-2">Error Analyzing Website</h3>
                <p className="text-red-700 mb-4">
                  {error instanceof Error ? error.message : "Failed to analyze website"}
                </p>
                <Button 
                  onClick={() => handleAnalyze(url)} 
                  variant="outline"
                  className="w-full sm:w-auto border-red-300 text-red-700 hover:bg-red-50"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !isError && analysis && analyzed && (
          <AnalysisResults analysis={analysis} />
        )}

        {!isLoading && !analyzed && !isError && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6 text-center">
            <div className="mx-auto w-32 h-32 sm:w-64 sm:h-40 rounded-lg mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 sm:h-20 sm:w-20 text-primary opacity-80" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Analyze Your Website's SEO Tags</h2>
            <p className="text-slate-500 max-w-lg mx-auto mb-8">
              Enter a website URL above to check meta tags, generate previews, and get recommendations to improve your SEO and social sharing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
              <div className="flex items-start bg-slate-50 p-4 rounded-lg">
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-slate-800">Search Previews</h3>
                  <p className="text-sm text-slate-500">See how your site appears in Google search results</p>
                </div>
              </div>
              <div className="flex items-start bg-slate-50 p-4 rounded-lg">
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                  <Share className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-slate-800">Social Media Cards</h3>
                  <p className="text-sm text-slate-500">Preview Facebook, Twitter and LinkedIn appearances</p>
                </div>
              </div>
              <div className="flex items-start bg-slate-50 p-4 rounded-lg sm:col-span-2 lg:col-span-1">
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-slate-800">SEO Recommendations</h3>
                  <p className="text-sm text-slate-500">Get tips to improve your meta tags and SEO</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
