import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, XCircle, Info } from "lucide-react";

interface Issue {
  type: "error" | "warning" | "info";
  message: string;
  recommendation: string;
}

interface RecommendationsListProps {
  issues: Issue[];
}

export default function RecommendationsList({ issues }: RecommendationsListProps) {
  if (issues.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Issues & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6 text-center">
            <div>
              <div className="rounded-full w-12 h-12 bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">No issues found</h3>
              <p className="text-slate-500 max-w-md">Your website has all the necessary SEO tags and follows best practices.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="bg-slate-50 border-b border-slate-200 px-4 py-3">
        <CardTitle>Issues & Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {issues.map((issue, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              {issue.type === "error" && <XCircle className="h-5 w-5 text-red-500" />}
              {issue.type === "warning" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
              {issue.type === "info" && <Info className="h-5 w-5 text-blue-500" />}
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium">{issue.message}</h4>
              <p className="mt-1 text-sm text-slate-500">{issue.recommendation}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
