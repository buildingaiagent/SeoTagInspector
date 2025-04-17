import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOAnalysis } from "@shared/schema";
import ScoreOverview from "./ScoreOverview";
import GooglePreview from "./GooglePreview";
import SocialPreviews from "./SocialPreviews";
import TagsList from "./TagsList";
import RecommendationsList from "./RecommendationsList";
import BestPractices from "./BestPractices";

interface AnalysisResultsProps {
  analysis: SEOAnalysis;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("analysis");

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-1">SEO Analysis Results</h2>
            <p className="text-slate-500">{`Analyzed ${analysis.url}`}</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="bg-slate-100 rounded-full p-1">
              <TabsTrigger 
                value="analysis" 
                className={activeTab === "analysis" 
                  ? "bg-white shadow-sm text-slate-800 rounded-full" 
                  : "text-slate-500 hover:text-slate-700 rounded-full"
                }
              >
                Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="previews" 
                className={activeTab === "previews" 
                  ? "bg-white shadow-sm text-slate-800 rounded-full" 
                  : "text-slate-500 hover:text-slate-700 rounded-full"
                }
              >
                Previews
              </TabsTrigger>
              <TabsTrigger 
                value="tags" 
                className={activeTab === "tags" 
                  ? "bg-white shadow-sm text-slate-800 rounded-full" 
                  : "text-slate-500 hover:text-slate-700 rounded-full"
                }
              >
                All Tags
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScoreOverview analysis={analysis} />

        <TabsContent value="analysis" className="space-y-6 mt-6">
          <RecommendationsList issues={analysis.issues || []} />
          <BestPractices bestPractices={analysis.bestPractices || []} />
        </TabsContent>

        <TabsContent value="previews" className="space-y-8 mt-6">
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
