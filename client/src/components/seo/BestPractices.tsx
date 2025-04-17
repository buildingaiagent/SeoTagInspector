import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface BestPractice {
  name: string;
  implemented: boolean;
  description?: string;
}

interface BestPracticesProps {
  bestPractices: BestPractice[];
}

export default function BestPractices({ bestPractices }: BestPracticesProps) {
  return (
    <Card>
      <CardHeader className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <CardTitle>Best Practices</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-200">
          {bestPractices.map((practice, index) => (
            <div key={index} className="flex items-center justify-between p-4">
              <div className="flex items-center">
                {practice.implemented ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-3" />
                )}
                <span className="text-sm">{practice.name}</span>
              </div>
              <Badge 
                variant="outline" 
                className={practice.implemented 
                  ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800" 
                  : "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
                }
              >
                {practice.implemented ? "Implemented" : "Missing"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
