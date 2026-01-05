import { useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, User, Trophy, Target, TrendingUp, Calendar } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklyScoreChart from "@/components/WeeklyScoreChart";
import playersData from "@/data/players.json";

const PlayerProfile = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "singles";
  const [rankingType, setRankingType] = useState(initialType);
  
  const player = playersData.find(p => p.id === Number(id));

  if (!player) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Player Not Found</h1>
          <Link to="/" className="text-accent hover:underline">
            Return to Leaderboard
          </Link>
        </div>
      </div>
    );
  }

  const playerData = player[rankingType];
  const sortedPlayers = [...playersData].sort((a, b) => b[rankingType].overallScore - a[rankingType].overallScore);
  const rank = sortedPlayers.findIndex(p => p.id === player.id) + 1;
  const latestScore = playerData.weeklyScores[playerData.weeklyScores.length - 1];
  const bestScore = Math.max(...playerData.weeklyScores);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="gradient-hero py-10 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Leaderboard</span>
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 animate-fade-in">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
              <User className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-bold rounded-full">
                  #{rank}
                </span>
                <span className="px-3 py-1 bg-primary-foreground/20 text-primary-foreground text-sm font-medium rounded-full capitalize">
                  {rankingType}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground uppercase tracking-tight">
                {player.name}
              </h1>
              <p className="text-primary-foreground/70 mt-2 max-w-2xl">
                {player.bio}
              </p>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
                {playerData.overallScore}
              </div>
              <div className="text-xs text-primary-foreground/70 uppercase tracking-widest mt-1">
                {rankingType} Score
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* Ranking Type Tabs */}
        <div className="flex justify-center mb-8">
          <Tabs value={rankingType} onValueChange={setRankingType}>
            <TabsList className="grid w-64 grid-cols-2">
              <TabsTrigger value="singles" className="font-display uppercase text-sm">
                Singles
              </TabsTrigger>
              <TabsTrigger value="doubles" className="font-display uppercase text-sm">
                Doubles
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Rank</span>
            </div>
            <div className="font-display text-3xl font-bold text-foreground">#{rank}</div>
            <div className="text-xs text-muted-foreground">of {playersData.length} players</div>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Matches</span>
            </div>
            <div className="font-display text-3xl font-bold text-foreground">{playerData.matchesPlayed}</div>
            <div className="text-xs text-muted-foreground">total played</div>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">This Week</span>
            </div>
            <div className="font-display text-3xl font-bold text-foreground">{latestScore}</div>
            <div className="text-xs text-muted-foreground">latest score</div>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Best</span>
            </div>
            <div className="font-display text-3xl font-bold text-accent">{bestScore}</div>
            <div className="text-xs text-muted-foreground">peak score</div>
          </div>
        </div>

        {/* Weekly Performance Chart */}
        <div className="animate-slide-up" style={{ animationDelay: "500ms" }}>
          <WeeklyScoreChart scores={playerData.weeklyScores} playerName={player.name} rankingType={rankingType} />
        </div>

        {/* Player Bio Card */}
        <div className="mt-8 bg-card rounded-xl p-6 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "600ms" }}>
          <h3 className="font-display text-lg font-semibold text-foreground mb-3">About {player.name}</h3>
          <p className="text-muted-foreground leading-relaxed">{player.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
