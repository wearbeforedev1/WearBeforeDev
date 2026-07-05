import { Badge } from "@/components/ui/badge";
import { likelihoodBand } from "@/lib/analytics/scoring";

export function EngagementBadge({ score }: { score: number }) {
  const band = likelihoodBand(score);
  const tone = band === "High" ? "success" : band === "Medium" ? "warning" : "neutral";
  return (
    <Badge tone={tone}>
      {score} · {band}
    </Badge>
  );
}
