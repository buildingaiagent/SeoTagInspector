import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SEOAnalysis } from "@shared/schema";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategorySummariesProps {
  analysis: SEOAnalysis;
}

interface CategoryScore {
  name: string;
  score: number;
  status: "good" | "fair" | "poor";
  color: string;
  icon: React.ReactNode;
  details: string;
}

export default function CategorySummaries({ analysis }: CategorySummariesProps) {
  // Helper function to calculate category scores
  const calculateCategoryScore = (category: string): CategoryScore => {
    const bestPractices = analysis.bestPractices || [];
    const categoryPractices = bestPractices.filter(practice => {
      switch (category) {
        case "Technical SEO":
          return ["Character Encoding", "Viewport Meta Tag", "Language Attribute", "Robots Meta Tag"].includes(practice.name);
        case "Content":
          return ["Title Tag", "Meta Description"].includes(practice.name);
        case "Social":
          return ["Open Graph Tags", "Twitter Card Tags"].includes(practice.name);
        case "Structure":
          return ["Canonical URL"].includes(practice.name);
        default:
          return false;
      }
    });
    
    const total = categoryPractices.length;
    const implemented = categoryPractices.filter(p => p.implemented).length;
    const score = total > 0 ? Math.round((implemented / total) * 100) : 0;

    let status: "good" | "fair" | "poor" = "poor";
    let color = "red";
    let icon = <XCircle className="h-5 w-5 text-red-500" />;
    let details = "";

    if (score >= 80) {
      status = "good";
      color = "green";
      icon = <CheckCircle className="h-5 w-5 text-green-500" />;
      details = "All essential elements present";
    } else if (score >= 50) {
      status = "fair";
      color = "amber";
      icon = <AlertTriangle className="h-5 w-5 text-amber-500" />;
      details = "Some elements missing or incomplete";
    } else {
      details = "Critical elements missing";
    }

    // Add specific details based on category
    switch (category) {
      case "Technical SEO":
        if (!analysis.viewport) {
          details = "Missing viewport meta tag";
        } else if (!analysis.charset) {
          details = "Missing charset definition";
        }
        break;
      case "Content":
        if (!analysis.title) {
          details = "Missing title tag";
        } else if (!analysis.description) {
          details = "Missing meta description";
        } else if (analysis.title && analysis.title.length > 60) {
          details = "Title tag too long";
        }
        break;
      case "Social":
        if (!analysis.ogTags || Object.keys(analysis.ogTags).length === 0) {
          details = "Missing Open Graph tags";
        } else if (!analysis.twitterTags || Object.keys(analysis.twitterTags).length === 0) {
          details = "Missing Twitter Card tags";
        }
        break;
      case "Structure":
        if (!analysis.canonical) {
          details = "Missing canonical URL";
        }
        break;
    }

    return {
      name: category,
      score,
      status,
      color,
      icon,
      details
    };
  };

  // Calculate scores for each category
  const technicalScore = calculateCategoryScore("Technical SEO");
  const contentScore = calculateCategoryScore("Content");
  const socialScore = calculateCategoryScore("Social");
  const structureScore = calculateCategoryScore("Structure");

  // Helper function to get badge and progress colors
  const getBadgeColor = (status: "good" | "fair" | "poor") => {
    switch (status) {
      case "good": return "bg-green-100 text-green-800 border-green-200";
      case "fair": return "bg-amber-100 text-amber-800 border-amber-200";
      case "poor": return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getProgressClassNames = (status: "good" | "fair" | "poor") => {
    switch (status) {
      case "good": return "bg-green-500";
      case "fair": return "bg-amber-500";
      case "poor": return "bg-red-500";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {/* Technical SEO Card */}
      <Card className="p-4 bg-gradient-to-b from-white to-slate-50 rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {technicalScore.icon}
            <h3 className="text-md font-medium text-slate-700">Technical SEO</h3>
          </div>
          <Badge className={`${getBadgeColor(technicalScore.status)} border`}>
            {technicalScore.status === "good" ? "Good" : technicalScore.status === "fair" ? "Needs Work" : "Critical"}
          </Badge>
        </div>
        <Progress 
          value={technicalScore.score} 
          className="h-2 mb-2" 
        />
        <style>{`
          .h-2.mb-2 > div {
            background-color: ${technicalScore.status === "good" ? "var(--green-500)" : 
            technicalScore.status === "fair" ? "var(--amber-500)" : "var(--red-500)"};
          }
        `}</style>
        <p className="text-sm text-slate-500 mt-1">{technicalScore.details}</p>
        <div className="mt-3 text-xs text-slate-400">
          <Info className="h-3 w-3 inline mr-1" />
          Includes viewport, charset, language, and robots
        </div>
      </Card>

      {/* Content Card */}
      <Card className="p-4 bg-gradient-to-b from-white to-slate-50 rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {contentScore.icon}
            <h3 className="text-md font-medium text-slate-700">Content</h3>
          </div>
          <Badge className={`${getBadgeColor(contentScore.status)} border`}>
            {contentScore.status === "good" ? "Good" : contentScore.status === "fair" ? "Needs Work" : "Critical"}
          </Badge>
        </div>
        <Progress 
          value={contentScore.score} 
          className="h-2 mb-2" 
        />
        <style>{`
          .h-2.mb-2 > div {
            background-color: ${contentScore.status === "good" ? "var(--green-500)" : 
            contentScore.status === "fair" ? "var(--amber-500)" : "var(--red-500)"};
          }
        `}</style>
        <p className="text-sm text-slate-500 mt-1">{contentScore.details}</p>
        <div className="mt-3 text-xs text-slate-400">
          <Info className="h-3 w-3 inline mr-1" />
          Includes title and meta description
        </div>
      </Card>

      {/* Social Card */}
      <Card className="p-4 bg-gradient-to-b from-white to-slate-50 rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {socialScore.icon}
            <h3 className="text-md font-medium text-slate-700">Social Sharing</h3>
          </div>
          <Badge className={`${getBadgeColor(socialScore.status)} border`}>
            {socialScore.status === "good" ? "Good" : socialScore.status === "fair" ? "Needs Work" : "Critical"}
          </Badge>
        </div>
        <Progress 
          value={socialScore.score} 
          className="h-2 mb-2" 
        />
        <style>{`
          .h-2.mb-2 > div {
            background-color: ${socialScore.status === "good" ? "var(--green-500)" : 
            socialScore.status === "fair" ? "var(--amber-500)" : "var(--red-500)"};
          }
        `}</style>
        <p className="text-sm text-slate-500 mt-1">{socialScore.details}</p>
        <div className="mt-3 text-xs text-slate-400">
          <Info className="h-3 w-3 inline mr-1" />
          Includes Open Graph and Twitter Card tags
        </div>
      </Card>

      {/* Structure Card */}
      <Card className="p-4 bg-gradient-to-b from-white to-slate-50 rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {structureScore.icon}
            <h3 className="text-md font-medium text-slate-700">Structure</h3>
          </div>
          <Badge className={`${getBadgeColor(structureScore.status)} border`}>
            {structureScore.status === "good" ? "Good" : structureScore.status === "fair" ? "Needs Work" : "Critical"}
          </Badge>
        </div>
        <Progress 
          value={structureScore.score} 
          className="h-2 mb-2" 
        />
        <style>{`
          .h-2.mb-2 > div {
            background-color: ${structureScore.status === "good" ? "var(--green-500)" : 
            structureScore.status === "fair" ? "var(--amber-500)" : "var(--red-500)"};
          }
        `}</style>
        <p className="text-sm text-slate-500 mt-1">{structureScore.details}</p>
        <div className="mt-3 text-xs text-slate-400">
          <Info className="h-3 w-3 inline mr-1" />
          Includes canonical URLs and page structure
        </div>
      </Card>
    </div>
  );
}