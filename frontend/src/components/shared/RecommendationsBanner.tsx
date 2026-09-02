import React, { useState, useEffect } from "react";
import { Sparkles, X, Check } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { recommendationService, Recommendation } from "../../services/recommendationService";
import { authService } from "../../lib/auth";

interface RecommendationsBannerProps {
  targetFeature: string;
  onRecommendationsLoaded?: (recs: Recommendation[]) => void;
}

const RecommendationsBanner: React.FC<RecommendationsBannerProps> = ({ targetFeature, onRecommendationsLoaded }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          const data = await recommendationService.getActiveRecommendations(session.user.id, targetFeature);
          setRecommendations(data);
          onRecommendationsLoaded?.(data);
        }
      } catch (err) {
        console.error("Failed to load recommendations", err);
      }
    };
    fetchRecommendations();
  }, [targetFeature]);

  const handleDismiss = async (id: string) => {
    try {
      await recommendationService.updateStatus(id, 'dismissed');
      const updated = recommendations.filter(r => r.id !== id);
      setRecommendations(updated);
      onRecommendationsLoaded?.(updated);
    } catch (err) {
      console.error("Failed to dismiss recommendation", err);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await recommendationService.updateStatus(id, 'completed');
      const updated = recommendations.filter(r => r.id !== id);
      setRecommendations(updated);
      onRecommendationsLoaded?.(updated);
    } catch (err) {
      console.error("Failed to complete recommendation", err);
    }
  };

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4 mb-8">
      <h2 className="text-xl font-bold text-brand-ink flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-brand-neon" />
        Recommended for You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="p-6 border-brand-neon/50 bg-brand-neon/5 relative flex flex-col">
            <div className="absolute top-4 right-4 flex space-x-2">
              <button onClick={() => handleComplete(rec.id)} className="p-1 rounded-full text-brand-darkgreen hover:bg-brand-neon/20 transition-colors" title="Mark Completed">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => handleDismiss(rec.id)} className="p-1 rounded-full text-brand-slate hover:bg-brand-slate/20 transition-colors" title="Dismiss">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mb-4 pr-12">
              <span className="text-xs font-bold text-brand-darkgreen uppercase tracking-wider bg-brand-neon/20 px-2.5 py-1 rounded-full">
                {rec.payload?.title || "Suggestion"}
              </span>
            </div>
            <p className="text-brand-ink font-medium mb-4 flex-grow">
              {rec.payload?.description || rec.payload?.message || "Check out this resource based on your recent activity."}
            </p>
            {rec.payload?.url && (
              <a href={rec.payload.url} target="_blank" rel="noreferrer" className="block w-full">
                <Button variant="primary" className="w-full bg-brand-ink text-white">
                  View Resource
                </Button>
              </a>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsBanner;
