import { Link } from "react-router-dom";
import { User, TrendingUp, Target } from "lucide-react";
import ScoreBar from "./ScoreBar";
import { getPlayerData } from "@/lib/rankings";

const PlayerCard = ({ player, rank, rankingType = "singles" }) => {
  const playerData = getPlayerData(player, rankingType);
  const latestScore = playerData.weeklyScores[playerData.weeklyScores.length - 1];
  const previousScore = playerData.weeklyScores[playerData.weeklyScores.length - 2];
  const trend = latestScore - previousScore;

  const getRankBadge = (rank) => {
    if (rank === 1) return "bg-amber-400 text-amber-900";
    if (rank === 2) return "bg-slate-300 text-slate-800";
    if (rank === 3) return "bg-amber-600 text-amber-100";
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <Link
      to={`/profile/${player.id}?type=${rankingType}`}
      className="block group"
    >
      <div className="bg-card rounded-xl p-5 shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50 hover:border-accent/30 animate-fade-in">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg ${getRankBadge(rank)}`}>
            {rank}
          </div>

          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-navy-medium flex items-center justify-center flex-shrink-0">
            <User className="w-7 h-7 text-primary-foreground" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors truncate">
              {player.name}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Target className="w-3.5 h-3.5" />
                {playerData.matchesPlayed} matches
              </span>
              <span className={`flex items-center gap-1 ${trend >= 0 ? "text-accent" : "text-destructive"}`}>
                <TrendingUp className={`w-3.5 h-3.5 ${trend < 0 ? "rotate-180" : ""}`} />
                {trend >= 0 ? "+" : ""}{trend}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="font-display text-2xl font-bold text-primary">
              {playerData.overallScore}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide capitalize">
              {rankingType}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <ScoreBar score={playerData.overallScore} showLabel={false} />
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
