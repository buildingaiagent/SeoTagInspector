
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOAnalysis } from "@shared/schema";
import ScoreOverview from "./ScoreOverview";
import GooglePreview from "./GooglePreview";
import SocialPreviews from "./SocialPreviews";
import TagsList from "./TagsList";
import RecommendationsList from "./RecommendationsList";
import BestPractices from "./BestPractices";
import CategorySummaries from "./CategorySummaries";
import SEOHealthOverview from "./SEOHealthOverview";
import SEOExplainer from "./SEOExplainer";
import { ChartBar, Image, Code, BarChart4, BookOpenCheck } from "lucide-react";

interface AnalysisResultsProps {
  analysis: SEOAnalysis;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500">No analysis results available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-1">SEO Analysis Results</h2>
            <p className="text-slate-500">{`Analyzed ${analysis.url}`}</p>
          </div>
        </div>

        <Tabs defaultValue="summary">
          <div className="flex justify-end mb-6">
            <TabsList className="bg-slate-100 rounded-full p-1 h-auto">
              <TabsTrigger 
                value="summary" 
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
              >
                <BarChart4 className="h-4 w-4" />
                <span className="hidden sm:inline">Summary</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analysis" 
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
              >
                <ChartBar className="h-4 w-4" />
                <span className="hidden sm:inline">Analysis</span>
              </TabsTrigger>
              <TabsTrigger 
                value="previews" 
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
              >
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Previews</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tags" 
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
              >
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">All Tags</span>
              </TabsTrigger>
              <TabsTrigger 
                value="learn" 
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
              >
                <BookOpenCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Learn</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Summary Tab - New visual overview */}
          <TabsContent value="summary" className="space-y-6">
            <SEOHealthOverview analysis={analysis} />
            <CategorySummaries analysis={analysis} />
            <ScoreOverview analysis={analysis} />
          </TabsContent>

          {/* Original Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6 mt-6">
            <RecommendationsList issues={analysis.issues || []} />
            <BestPractices bestPractices={analysis.bestPractices || []} />
          </TabsContent>

          {/* Previews Tab */}
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

          {/* Tags Tab */}
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

          {/* New Learning Tab */}
          <TabsContent value="learn" className="mt-6">
            <SEOExplainer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
