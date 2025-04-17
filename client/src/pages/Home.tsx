import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import UrlForm from "@/components/seo/UrlForm";
import AnalysisResults from "@/components/seo/AnalysisResults";
import { useQuery } from "@tanstack/react-query";
import { SEOAnalysis } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { AlertCircle, Search, Share, CheckCircle } from "lucide-react";

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
    
    try {
      await apiRequest("POST", "/api/analyze", { url: websiteUrl });
      await refetch();
      setAnalyzed(true);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze website",
      });
    }
  };

  const handleReset = () => {
    setUrl("");
    setAnalyzed(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-700">
      <div className="mx-auto container px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-800">SEO Tag Analyzer</h1>
              <p className="text-slate-500 mt-1">Visualize and analyze your website's meta tags</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleReset} 
                className="px-4 py-2 text-slate-600 bg-white rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                  </svg>
                  Reset
                </span>
              </button>
            </div>
          </div>

          <UrlForm 
            onAnalyze={handleAnalyze} 
            isLoading={isLoading || isFetching} 
          />
        </header>

        {(isLoading || isFetching) && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-primary rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-medium text-slate-700 mb-2">Analyzing Meta Tags</h2>
            <p className="text-slate-500 text-center max-w-md">
              Fetching and parsing the HTML from the website. This may take a moment depending on the site's size.
            </p>
          </div>
        )}

        {isError && !isLoading && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-red-800">Error Analyzing Website</h3>
                <p className="mt-1 text-red-700">
                  {error instanceof Error ? error.message : "Failed to analyze website"}
                </p>
                <div className="mt-3">
                  <button 
                    onClick={() => handleAnalyze(url)} 
                    className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !isError && analysis && analyzed && (
          <AnalysisResults analysis={analysis} />
        )}

        {!isLoading && !analyzed && !isError && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
            <div className="mx-auto w-64 h-40 rounded-lg mb-6 bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-400 opacity-80" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Analyze Your Website's SEO Tags</h2>
            <p className="text-slate-500 max-w-lg mx-auto mb-6">
              Enter a website URL above to check meta tags, generate previews, and get recommendations to improve your SEO and social sharing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <Search className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-slate-700">Search Previews</h3>
                  <p className="text-sm text-slate-500">See how your site appears in Google search results</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <Share className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-slate-700">Social Media Cards</h3>
                  <p className="text-sm text-slate-500">Preview Facebook, Twitter and LinkedIn appearances</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-slate-700">SEO Recommendations</h3>
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
