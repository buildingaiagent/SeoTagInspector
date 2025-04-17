import { Card } from "@/components/ui/card";
import { SEOAnalysis } from "@shared/schema";
import { BarChart, CircleCheckBig, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';

interface SEOHealthOverviewProps {
  analysis: SEOAnalysis;
}

export default function SEOHealthOverview({ analysis }: SEOHealthOverviewProps) {
  const { t } = useTranslation();
  
  // Calculate health metrics
  const score = analysis.score || 0;
  const issues = analysis.issues || [];
  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;
  const infoCount = issues.filter(i => i.type === 'info').length;

  // Determine overall health status
  let healthStatus = "Excellent";
  let healthColor = "bg-green-100 text-green-800 border-green-200";
  let healthIcon = <CircleCheckBig className="h-12 w-12 text-green-500" />;
  
  if (errorCount > 0 || score < 50) {
    healthStatus = "Poor";
    healthColor = "bg-red-100 text-red-800 border-red-200";
    healthIcon = <AlertCircle className="h-12 w-12 text-red-500" />;
  } else if (warningCount > 2 || score < 70) {
    healthStatus = "Fair";
    healthColor = "bg-amber-100 text-amber-800 border-amber-200";
    healthIcon = <AlertCircle className="h-12 w-12 text-amber-500" />;
  } else if (warningCount > 0 || score < 90) {
    healthStatus = "Good";
    healthColor = "bg-blue-100 text-blue-800 border-blue-200";
    healthIcon = <CircleCheckBig className="h-12 w-12 text-blue-500" />;
  }

  // Calculate implementation rate percentages
  const bestPractices = analysis.bestPractices || [];
  const implementationRate = bestPractices.length > 0 
    ? Math.round((bestPractices.filter(bp => bp.implemented).length / bestPractices.length) * 100) 
    : 0;

  return (
    <Card className="p-5 bg-gradient-to-b from-white to-slate-50 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 sm:border-r sm:pr-5 sm:mr-5">
          {healthIcon}
        </div>
        
        <div className="flex-grow space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h3 className="text-lg font-semibold text-slate-800">{t('overallSeoHealth')}</h3>
            <Badge className={`${healthColor} border text-sm py-1 px-3 whitespace-nowrap`}>
              {t(healthStatus.toLowerCase(), healthStatus)}
            </Badge>
          </div>
          
          <p className="text-slate-600">
            {t('yourWebsiteHas')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
            <div className="bg-slate-100 rounded-md p-3 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-slate-800">{Math.round(score)}%</span>
              <span className="text-xs text-slate-500">{t('overallScore')}</span>
            </div>
            
            <div className="bg-slate-100 rounded-md p-3 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-slate-800">{implementationRate}%</span>
              <span className="text-xs text-slate-500">{t('implemented')}</span>
            </div>
            
            <div className="bg-slate-100 rounded-md p-3 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-semibold text-slate-800">{errorCount}</span>
                <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">{t('errors')}</span>
              </div>
              <span className="text-xs text-slate-500">{t('criticalIssues')}</span>
            </div>
            
            <div className="bg-slate-100 rounded-md p-3 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-semibold text-slate-800">{warningCount}</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">{t('warnings')}</span>
              </div>
              <span className="text-xs text-slate-500">{t('improvementAreas')}</span>
            </div>
          </div>
          
          <div className="pt-2 text-sm text-slate-500 flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span>{t('seoHealth')}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}