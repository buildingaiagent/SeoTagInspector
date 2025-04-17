
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SEOAnalysis } from "@shared/schema";

interface ProgressTrackerProps {
  previousScore?: number;
  currentScore: number;
}

export default function ProgressTracker({ previousScore, currentScore }: ProgressTrackerProps) {
  const improvement = previousScore ? currentScore - previousScore : 0;
  
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">SEO Progress</h3>
      <Progress value={currentScore} className="mb-2" />
      {previousScore && (
        <p className="text-sm text-slate-600">
          Score improved by {improvement.toFixed(1)} points since last analysis
        </p>
      )}
    </Card>
  );
}
