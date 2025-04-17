import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOAnalysis } from "@shared/schema";
import ScoreOverview from "./ScoreOverview";
import GooglePreview from "./GooglePreview";
import SocialPreviews from "./SocialPreviews";
import TagsList from "./TagsList";
import RecommendationsList from "./RecommendationsList";
import BestPractices from "./BestPractices";
import { ChartBar, Image, Code } from "lucide-react";

interface AnalysisResultsProps {
  analysis: SEOAnalysis;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("analysis");

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent mb-1">SEO Analysis Results</h2>
            <p className="text-slate-500">{`Analyzed ${analysis.url}`}</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="w-full sm:w-auto bg-slate-100 rounded-full p-1 h-auto">
              <TabsTrigger 
                value="analysis" 
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${
                  activeTab === "analysis" 
                    ? "bg-white shadow-sm text-primary rounded-full" 
                    : "text-slate-600 hover:text-primary rounded-full"
                }`}
              >
                <ChartBar className="h-4 w-4" />
                <span className="hidden sm:inline">Analysis</span>
              </TabsTrigger>
              <TabsTrigger 
                value="previews" 
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${
                  activeTab === "previews" 
                    ? "bg-white shadow-sm text-primary rounded-full" 
                    : "text-slate-600 hover:text-primary rounded-full"
                }`}
              >
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Previews</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tags" 
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${
                  activeTab === "tags" 
                    ? "bg-white shadow-sm text-primary rounded-full" 
                    : "text-slate-600 hover:text-primary rounded-full"
                }`}
              >
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">All Tags</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScoreOverview analysis={analysis} />

        <TabsContent value="analysis" className="space-y-6 mt-6">
          <RecommendationsList issues={analysis.issues || []} />
          <BestPractices bestPractices={analysis.bestPractices || []} />
        </TabsContent>

        <TabsContent value="previews" className="space-y-6 sm:space-y-8 mt-6">
          <GooglePreview title={analysis.title} description={analysis.description} url={analysis.url} />
          <SocialPreviews 
            title={analysis.title} 
            description={analysis.description}
            url={analysis.url}
            ogTags={analysis.ogTags}
            twitterTags={analysis.twitterTags}
          />
        </TabsContent>

        <TabsContent value="tags" className="mt-6">
          <TagsList 
            title={analysis.title}
            description={analysis.description}
            charset={analysis.charset}
            viewport={analysis.viewport}
            canonical={analysis.canonical}
            language={analysis.language}
            robots={analysis.robots}
            ogTags={analysis.ogTags}
            twitterTags={analysis.twitterTags}
            otherTags={analysis.otherTags}
          />
        </TabsContent>
      </div>
    </div>
  );
}
