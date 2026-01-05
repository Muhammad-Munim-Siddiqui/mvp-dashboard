import { useState } from "react";
import { Calendar, TrendingUp, TrendingDown, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import playersData from "@/data/players.json";
import { getPlayerData } from "@/lib/rankings";

const WeeklyResults = () => {
  const [rankingType, setRankingType] = useState("singles");

  // Get latest week scores (last element in weeklyScores array)
  const weeklyData = playersData.map(player => {
    const playerData = getPlayerData(player, rankingType);
    return {
      ...player,
      latestScore: playerData.weeklyScores[playerData.weeklyScores.length - 1],
      previousScore: playerData.weeklyScores[playerData.weeklyScores.length - 2],
      trend: playerData.weeklyScores[playerData.weeklyScores.length - 1] - playerData.weeklyScores[playerData.weeklyScores.length - 2]
    };
  }).sort((a, b) => b.latestScore - a.latestScore);

  const topPerformer = weeklyData[0];
  const biggestGainer = [...weeklyData].sort((a, b) => b.trend - a.trend)[0];
  const averageWeeklyScore = Math.round(weeklyData.reduce((acc, p) => acc + p.latestScore, 0) / weeklyData.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="gradient-hero py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center text-primary-foreground animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar className="w-6 h-6 text-accent" />
              <span className="text-sm uppercase tracking-widest text-primary-foreground/70">Current Week</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-3">
              Week 7 Results
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Performance breakdown for the latest training week
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* Ranking Type Tabs */}
        <div className="flex justify-center mb-8">
          <Tabs value={rankingType} onValueChange={setRankingType}>
            <TabsList className="grid w-auto grid-cols-3">
              <TabsTrigger value="singles" className="font-display uppercase text-sm">
                Singles
              </TabsTrigger>
              <TabsTrigger value="doubles" className="font-display uppercase text-sm">
                Doubles
              </TabsTrigger>
              <TabsTrigger value="overall" className="font-display uppercase text-sm">
                Overall
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-wide">Top Performer</span>
            </div>
            <Link to={`/profile/${topPerformer.id}?type=${rankingType}`} className="block hover:text-accent transition-colors">
              <h3 className="font-display text-xl font-bold text-foreground">{topPerformer.name}</h3>
            </Link>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-display text-3xl font-bold text-accent">{topPerformer.latestScore}</span>
              <span className="text-sm text-muted-foreground">points</span>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-wide">Biggest Gain</span>
            </div>
            <Link to={`/profile/${biggestGainer.id}?type=${rankingType}`} className="block hover:text-accent transition-colors">
              <h3 className="font-display text-xl font-bold text-foreground">{biggestGainer.name}</h3>
            </Link>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-display text-3xl font-bold text-accent">+{biggestGainer.trend}</span>
              <span className="text-sm text-muted-foreground">from last week</span>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Calendar className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-wide">Team Average</span>
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">All Players</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-display text-3xl font-bold text-foreground">{averageWeeklyScore}</span>
              <span className="text-sm text-muted-foreground">avg score</span>
            </div>
          </div>
        </div>

        {/* Weekly Breakdown */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground uppercase mb-6">
          All Results <span className="text-muted-foreground capitalize">({rankingType})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {weeklyData.map((player, index) => (
            <Link
              key={player.id}
              to={`/profile/${player.id}?type=${rankingType}`}
              className="bg-card rounded-xl p-5 shadow-card border border-border/50 hover:border-accent/30 hover:shadow-elevated transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {player.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Previous: {player.previousScore}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-display text-2xl font-bold text-primary">
                    {player.latestScore}
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    player.trend > 0 ? "text-accent" : player.trend < 0 ? "text-destructive" : "text-muted-foreground"
                  }`}>
                    {player.trend > 0 ? <TrendingUp className="w-3 h-3" /> : player.trend < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                    {player.trend > 0 ? "+" : ""}{player.trend}
                  </div>
                </div>
              </div>

              {/* Score bar */}
              <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${player.latestScore}%` }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyResults;
