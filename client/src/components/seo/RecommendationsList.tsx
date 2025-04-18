import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, XCircle, Info, CheckCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface Issue {
  type: "error" | "warning" | "info";
  message: string;
  recommendation: string;
}

interface RecommendationsListProps {
  issues: Issue[];
}

export default function RecommendationsList({ issues }: RecommendationsListProps) {
  const { t } = useTranslation();
  
  // Count issues by type to display in the header
  const errorCount = issues.filter(issue => issue.type === "error").length;
  const warningCount = issues.filter(issue => issue.type === "warning").length;
  const infoCount = issues.filter(issue => issue.type === "info").length;

  if (issues.length === 0) {
    return (
      <Card className="border border-green-100 shadow-sm">
        <CardHeader className="bg-green-50 border-b border-green-100 pb-3">
          <CardTitle className="text-green-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            {t('allChecksPassed')}
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white rounded-b-lg">
          <div className="flex items-center justify-center py-8 text-center">
            <div>
              <div className="rounded-full w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">{t('noIssuesFound')}</h3>
              <p className="text-slate-600 max-w-md">{t('yourWebsiteHasAll')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 px-4 py-3 space-y-1">
        <CardTitle className="flex items-center justify-between whitespace-normal">
          <span className="whitespace-normal">{t('issuesRecommendations')}</span>
          <div className="flex items-center gap-1.5 text-xs">
            {errorCount > 0 && (
              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <XCircle className="h-3 w-3" /> {errorCount}
              </span>
            )}
            {warningCount > 0 && (
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> {warningCount}
              </span>
            )}
            {infoCount > 0 && (
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Info className="h-3 w-3" /> {infoCount}
              </span>
            )}
          </div>
        </CardTitle>
        <CardDescription className="text-xs text-slate-500 whitespace-normal">
          {t('fixIssues')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 divide-y divide-slate-100">
        {issues.map((issue, index) => {
          let bgColor = "bg-white";
          let iconColor = "text-blue-500";
          let borderColor = "border-l-blue-500";
          let Icon = Info;

          if (issue.type === "error") {
            bgColor = "bg-red-50";
            iconColor = "text-red-500";
            borderColor = "border-l-red-500";
            Icon = XCircle;
          } else if (issue.type === "warning") {
            bgColor = "bg-amber-50";
            iconColor = "text-amber-500";
            borderColor = "border-l-amber-500";
            Icon = AlertTriangle;
          }

          return (
            <div key={index} className={`p-4 ${bgColor} border-l-4 ${borderColor}`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{issue.message}</h4>
                  <p className="mt-1 text-sm text-slate-600">{issue.recommendation}</p>
                  <div className="mt-2 p-2 bg-slate-50 rounded-md border border-slate-200">
                    <h5 className="text-xs font-semibold text-slate-700 mb-1 whitespace-normal">{t('actionSteps')}</h5>
                    <ol className="text-xs text-slate-600 list-decimal list-inside space-y-1">
                      {issue.type === "error" ? (
                        <>
                          <li className="whitespace-normal">{t('prioritizeFix')}</li>
                          <li className="whitespace-normal">{t('reviewRecommendation')}</li>
                          <li className="whitespace-normal">{t('implementChanges')}</li>
                          <li className="whitespace-normal">{t('rerunAnalysis')}</li>
                        </>
                      ) : issue.type === "warning" ? (
                        <>
                          <li className="whitespace-normal">{t('considerAddressing')}</li>
                          <li className="whitespace-normal">{t('followGuidelines')}</li>
                          <li className="whitespace-normal">{t('testChanges')}</li>
                        </>
                      ) : (
                        <>
                          <li className="whitespace-normal">{t('reviewSuggestion')}</li>
                          <li className="whitespace-normal">{t('implementIfAligned')}</li>
                        </>
                      )}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}