import { useState, useMemo } from "react";
import { Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayerCard from "@/components/PlayerCard";
import PlayerSearch from "@/components/PlayerSearch";
import PlayerFilters from "@/components/PlayerFilters";
import PlayerComparison from "@/components/PlayerComparison";
import playersData from "@/data/players.json";

const Players = () => {
  const [rankingType, setRankingType] = useState("singles");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    scoreRange: [0, 100],
    matchesRange: [0, 50],
  });

  const filteredPlayers = useMemo(() => {
    return [...playersData]
      .filter(player => {
        const playerData = player[rankingType];
        
        // Search filter
        if (searchQuery && !player.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Score filter
        if (playerData.overallScore < filters.scoreRange[0] || 
            playerData.overallScore > filters.scoreRange[1]) {
          return false;
        }
        
        // Matches filter
        if (playerData.matchesPlayed < filters.matchesRange[0] || 
            playerData.matchesPlayed > filters.matchesRange[1]) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => b[rankingType].overallScore - a[rankingType].overallScore);
  }, [playersData, rankingType, searchQuery, filters]);

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
        {/* Controls Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground uppercase">
            All Players
          </h2>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="w-full sm:w-64">
              <PlayerSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            </div>
            <div className="flex gap-3">
              <PlayerFilters filters={filters} onFiltersChange={setFilters} />
              <PlayerComparison rankingType={rankingType} />
            </div>
          </div>
        </div>

        {/* Ranking Type Tabs */}
        <div className="mb-6">
          <Tabs value={rankingType} onValueChange={setRankingType} className="w-full sm:w-auto">
            <TabsList className="grid w-full sm:w-auto grid-cols-2">
              <TabsTrigger value="singles" className="font-display uppercase text-sm">
                Singles
              </TabsTrigger>
              <TabsTrigger value="doubles" className="font-display uppercase text-sm">
                Doubles
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredPlayers.length} of {playersData.length} players
        </div>

        {/* Player Grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlayers.map((player, index) => (
              <div key={player.id} style={{ animationDelay: `${index * 50}ms` }}>
                <PlayerCard player={player} rank={index + 1} rankingType={rankingType} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No players match your criteria</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;
