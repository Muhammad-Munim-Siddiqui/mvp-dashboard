import { useState } from "react";
import { Trophy, Users, TrendingUp, Target } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderboardTable from "@/components/LeaderboardTable";
import playersData from "@/data/players.json";
import { getPlayerData, sortPlayersByRanking } from "@/lib/rankings";

const Index = () => {
  const [rankingType, setRankingType] = useState("singles");

  const sortedPlayers = sortPlayersByRanking(playersData, rankingType);
  const topPlayer = sortedPlayers[0];
  const totalMatches = playersData.reduce((acc, player) => acc + getPlayerData(player, rankingType).matchesPlayed, 0);
  const averageScore = Math.round(playersData.reduce((acc, player) => acc + getPlayerData(player, rankingType).overallScore, 0) / playersData.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-primary-foreground animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4">
              Season Leaderboard
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Track the top performers at Elite Sports Academy. Updated weekly with the latest scores and rankings.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center animate-slide-up" style={{ animationDelay: "100ms" }}>
              <Trophy className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="font-display text-2xl font-bold text-primary-foreground">{topPlayer.name.split(" ")[0]}</div>
              <div className="text-xs text-primary-foreground/70 uppercase tracking-wide">Top Player</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="font-display text-2xl font-bold text-primary-foreground">{playersData.length}</div>
              <div className="text-xs text-primary-foreground/70 uppercase tracking-wide">Athletes</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center animate-slide-up" style={{ animationDelay: "300ms" }}>
              <Target className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="font-display text-2xl font-bold text-primary-foreground">{totalMatches}</div>
              <div className="text-xs text-primary-foreground/70 uppercase tracking-wide">Total Matches</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center animate-slide-up" style={{ animationDelay: "400ms" }}>
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="font-display text-2xl font-bold text-primary-foreground">{averageScore}</div>
              <div className="text-xs text-primary-foreground/70 uppercase tracking-wide">Avg Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground uppercase">
            Rankings
          </h2>
          
          <Tabs value={rankingType} onValueChange={setRankingType} className="w-full sm:w-auto">
            <TabsList className="grid w-full sm:w-auto grid-cols-3">
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
        
        <LeaderboardTable players={playersData} rankingType={rankingType} />
      </section>
    </div>
  );
};

export default Index;
