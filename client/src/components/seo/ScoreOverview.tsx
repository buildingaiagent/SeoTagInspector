import { Card } from "@/components/ui/card";
import { SEOAnalysis } from "@shared/schema";
import { CheckCircle } from "lucide-react";

interface ScoreOverviewProps {
  analysis: SEOAnalysis;
}

export default function ScoreOverview({ analysis }: ScoreOverviewProps) {
  // Calculate score metrics
  const score = analysis.score || 0;
  const roundedScore = Math.round(score);
  
  // Determine score status
  let scoreStatus = "Good";
  let scoreColor = "text-green-500";
  let scoreBgColor = "bg-green-100";
  let scoreTextColor = "text-green-800";
  
  if (score < 50) {
    scoreStatus = "Poor";
    scoreColor = "text-red-500";
    scoreBgColor = "bg-red-100";
    scoreTextColor = "text-red-800";
  } else if (score < 70) {
    scoreStatus = "Fair";
    scoreColor = "text-amber-500";
    scoreBgColor = "bg-amber-100";
    scoreTextColor = "text-amber-800";
  }

  // Calculate best practices metrics
  const totalBestPractices = analysis.bestPractices?.length || 0;
  const implementedBestPractices = analysis.bestPractices?.filter(p => p.implemented).length || 0;
  
  // Determine core tags status
  const hasTitle = !!analysis.title;
  const hasDescription = !!analysis.description;
  const hasViewport = !!analysis.viewport;
  
  const coreTagsComplete = hasTitle && hasDescription && hasViewport;
  const coreTagsStatus = coreTagsComplete ? "Complete" : "Incomplete";
  
  // Determine social media status
  const hasOgTags = !!(analysis.ogTags && Object.keys(analysis.ogTags).length > 0);
  const hasTwitterTags = !!(analysis.twitterTags && Object.keys(analysis.twitterTags).length > 0);
  
  const socialComplete = hasOgTags && hasTwitterTags;
  const socialPartial = hasOgTags || hasTwitterTags;
  let socialStatus = "Missing";
  let socialBgColor = "bg-red-100";
  let socialTextColor = "text-red-800";
  
  if (socialComplete) {
    socialStatus = "Complete";
    socialBgColor = "bg-green-100";
    socialTextColor = "text-green-800";
  } else if (socialPartial) {
    socialStatus = "Partial";
    socialBgColor = "bg-amber-100";
    socialTextColor = "text-amber-800";
  }

  // Calculate offset for score circle
  const offset = 100 - roundedScore;
  const circumference = 2 * Math.PI * 16;
  const dashOffset = (offset / 100) * circumference;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-slate-500">Overall Score</h3>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${scoreBgColor} ${scoreTextColor}`}>
            {scoreStatus}
          </span>
        </div>
        <div className="flex items-center">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2"></circle>
              <circle 
                cx="18" 
                cy="18" 
                r="16" 
                fill="none" 
                stroke={scoreColor.replace("text-", "var(--")} 
                strokeWidth="2" 
                strokeDasharray={circumference} 
                strokeDashoffset={dashOffset} 
                transform="rotate(-90 18 18)"
              ></circle>
              <text 
                x="18" 
                y="18" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fontSize="10" 
                fontWeight="bold" 
                fill={scoreColor.replace("text-", "var(--")}
              >
                {roundedScore}%
              </text>
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm">
              <span className="font-medium">{implementedBestPractices}</span> out of <span className="font-medium">{totalBestPractices}</span> checks passed
            </p>
            <p className="text-xs text-slate-500 mt-1">Last analyzed: Just now</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-slate-500">Core Tags</h3>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${coreTagsComplete ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
            {coreTagsStatus}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            {hasTitle ? (
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <svg className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="text-sm">Title Tag</span>
          </div>
          <div className="flex items-center">
            {hasDescription ? (
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <svg className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="text-sm">Meta Description</span>
          </div>
          <div className="flex items-center">
            {hasViewport ? (
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <svg className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="text-sm">Viewport</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-slate-500">Social Media</h3>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${socialBgColor} ${socialTextColor}`}>
            {socialStatus}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            {hasOgTags ? (
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <svg className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="text-sm">Open Graph Tags</span>
          </div>
          <div className="flex items-center">
            {hasTwitterTags ? (
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <svg className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="text-sm">Twitter Card</span>
          </div>
          {hasOgTags && analysis.ogTags?.["image"] && (!analysis.ogTags?.["image:width"] || !analysis.ogTags?.["image:height"]) && (
            <div className="flex items-center">
              <svg className="h-4 w-4 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm">Missing og:image dimensions</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
