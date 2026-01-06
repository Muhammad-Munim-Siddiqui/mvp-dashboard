import { useState } from "react";
import { Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayerCard from "@/components/PlayerCard";
import playersData from "@/data/players.json";

const getOverallScore = (player) => Math.round((player.singles.overallScore + player.doubles.overallScore) / 2);

const Players = () => {
  const [rankingType, setRankingType] = useState("singles");
  
  const getPlayerScore = (player) => rankingType === "overall" ? getOverallScore(player) : player[rankingType].overallScore;
  const sortedPlayers = [...playersData].sort((a, b) => getPlayerScore(b) - getPlayerScore(a));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="gradient-hero py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center text-primary-foreground animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="w-6 h-6 text-accent" />
              <span className="text-sm uppercase tracking-widest text-primary-foreground/70">Academy Roster</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-3">
              Our Athletes
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Meet the talented athletes of Elite Sports Academy
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground uppercase">
            All Players
          </h2>
          
          <Tabs value={rankingType} onValueChange={setRankingType} className="w-full sm:w-auto">
            <TabsList className="grid w-full sm:w-auto grid-cols-3">
              <TabsTrigger value="overall" className="font-display uppercase text-sm">
                Overall
              </TabsTrigger>
              <TabsTrigger value="singles" className="font-display uppercase text-sm">
                Singles
              </TabsTrigger>
              <TabsTrigger value="doubles" className="font-display uppercase text-sm">
                Doubles
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedPlayers.map((player, index) => (
            <div key={player.id} style={{ animationDelay: `${index * 50}ms` }}>
              <PlayerCard player={player} rank={index + 1} rankingType={rankingType} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Players;
