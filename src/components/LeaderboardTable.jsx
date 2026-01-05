import { Link } from "react-router-dom";
import { ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getPlayerData, sortPlayersByRanking } from "@/lib/rankings";

const LeaderboardTable = ({ players, rankingType = "singles" }) => {
  const sortedPlayers = sortPlayersByRanking(players, rankingType);

  const getRankStyle = (rank) => {
    if (rank === 1) return "bg-amber-400 text-amber-900 font-bold";
    if (rank === 2) return "bg-slate-300 text-slate-800 font-bold";
    if (rank === 3) return "bg-amber-600 text-amber-100 font-bold";
    return "bg-secondary text-secondary-foreground";
  };

  const getTrend = (weeklyScores) => {
    const latest = weeklyScores[weeklyScores.length - 1];
    const previous = weeklyScores[weeklyScores.length - 2];
    return latest - previous;
  };

  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="gradient-hero text-primary-foreground">
              <th className="px-4 py-4 text-left font-display text-sm uppercase tracking-wider">Rank</th>
              <th className="px-4 py-4 text-left font-display text-sm uppercase tracking-wider">Player</th>
              <th className="px-4 py-4 text-center font-display text-sm uppercase tracking-wider hidden sm:table-cell">Matches</th>
              <th className="px-4 py-4 text-center font-display text-sm uppercase tracking-wider hidden md:table-cell">Trend</th>
              <th className="px-4 py-4 text-center font-display text-sm uppercase tracking-wider">Score</th>
              <th className="px-4 py-4 text-right font-display text-sm uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => {
              const rank = index + 1;
              const playerData = getPlayerData(player, rankingType);
              const trend = getTrend(playerData.weeklyScores);

              return (
                <tr
                  key={player.id}
                  className="table-stripe border-b border-border/30 hover:bg-accent/5 transition-colors group"
                >
                  <td className="px-4 py-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${getRankStyle(rank)}`}>
                      {rank}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Link 
                      to={`/profile/${player.id}?type=${rankingType}`}
                      className="font-semibold text-foreground hover:text-accent transition-colors"
                    >
                      {player.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-center text-muted-foreground hidden sm:table-cell">
                    {playerData.matchesPlayed}
                  </td>
                  <td className="px-4 py-4 text-center hidden md:table-cell">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      trend > 0 ? "bg-accent/10 text-accent" :
                      trend < 0 ? "bg-destructive/10 text-destructive" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {trend > 0 ? <TrendingUp className="w-3 h-3" /> :
                       trend < 0 ? <TrendingDown className="w-3 h-3" /> :
                       <Minus className="w-3 h-3" />}
                      {trend > 0 ? "+" : ""}{trend}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-display text-xl font-bold text-primary">
                      {playerData.overallScore}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link
                      to={`/profile/${player.id}?type=${rankingType}`}
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <span className="hidden sm:inline text-sm">View</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
