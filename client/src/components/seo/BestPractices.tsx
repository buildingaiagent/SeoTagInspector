import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface BestPractice {
  name: string;
  implemented: boolean;
  description?: string;
}

interface BestPracticesProps {
  bestPractices: BestPractice[];
}

export default function BestPractices({ bestPractices }: BestPracticesProps) {
  const { t } = useTranslation();
  
  // Calculate summary stats
  const totalPractices = bestPractices.length;
  const implementedCount = bestPractices.filter(p => p.implemented).length;
  const implementationPercentage = Math.round((implementedCount / totalPractices) * 100);

  return (
    <Card className="border border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 px-4 py-3 space-y-1">
        <CardTitle className="flex items-center justify-between">
          <span>{t('seoBestPractices')}</span>
          <Badge 
            variant="outline" 
            className={`
              ${implementationPercentage >= 80 ? 'bg-green-100 text-green-800' : 
                implementationPercentage >= 50 ? 'bg-amber-100 text-amber-800' : 
                'bg-red-100 text-red-800'}
            `}
          >
            {implementedCount}/{totalPractices} {t('implementedCount')}
          </Badge>
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          {t('industryStandard')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {bestPractices.map((practice, index) => (
            <div 
              key={index} 
              className={`p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors ${
                practice.implemented ? 'border-l-2 border-l-green-500' : 'border-l-2 border-l-red-500'
              }`}
            >
              <div className="flex items-center">
                {practice.implemented ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                )}
                <div>
                  <span className="text-sm font-medium text-slate-800">{practice.name}</span>
                  {practice.description && (
                    <div className="group relative inline-block ml-1">
                      <HelpCircle className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                      <div className="absolute left-0 top-full mt-1 w-64 p-2 bg-white shadow-lg rounded text-xs text-slate-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50 border border-slate-200">
                        {practice.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`
                  ${practice.implemented 
                    ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800" 
                    : "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"}
                  text-xs py-0.5 px-2 h-auto
                `}
              >
                {practice.implemented ? t('implemented') : t('missing')}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
