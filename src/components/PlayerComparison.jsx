import { useState } from "react";
import { X, User, TrendingUp, Target, Trophy, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ScoreBar from "./ScoreBar";
import playersData from "@/data/players.json";

const PlayerComparison = ({ rankingType = "singles" }) => {
  const [player1Id, setPlayer1Id] = useState("");
  const [player2Id, setPlayer2Id] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const player1 = playersData.find(p => p.id.toString() === player1Id);
  const player2 = playersData.find(p => p.id.toString() === player2Id);

  const getPlayerRank = (playerId) => {
    const sorted = [...playersData].sort((a, b) => 
      b[rankingType].overallScore - a[rankingType].overallScore
    );
    return sorted.findIndex(p => p.id.toString() === playerId) + 1;
  };

  const ComparisonStat = ({ label, value1, value2, higherIsBetter = true }) => {
    const v1 = parseFloat(value1) || 0;
    const v2 = parseFloat(value2) || 0;
    const winner = higherIsBetter ? (v1 > v2 ? 1 : v2 > v1 ? 2 : 0) : (v1 < v2 ? 1 : v2 < v1 ? 2 : 0);

    return (
      <div className="grid grid-cols-3 gap-2 items-center py-3 border-b border-border/50 last:border-0">
        <div className={`text-right font-display text-lg ${winner === 1 ? 'text-accent font-bold' : 'text-foreground'}`}>
          {value1 || '-'}
        </div>
        <div className="text-center text-sm text-muted-foreground uppercase font-display">
          {label}
        </div>
        <div className={`text-left font-display text-lg ${winner === 2 ? 'text-accent font-bold' : 'text-foreground'}`}>
          {value2 || '-'}
        </div>
      </div>
    );
  };

  const PlayerSelect = ({ value, onChange, excludeId, label }) => (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {playersData
          .filter(p => p.id.toString() !== excludeId)
          .map(player => (
            <SelectItem key={player.id} value={player.id.toString()}>
              {player.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ArrowRightLeft className="w-4 h-4" />
          Compare Players
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display uppercase text-xl flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-accent" />
            Player Comparison
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 my-4">
          <PlayerSelect 
            value={player1Id} 
            onChange={setPlayer1Id} 
            excludeId={player2Id}
            label="Select Player 1"
          />
          <PlayerSelect 
            value={player2Id} 
            onChange={setPlayer2Id} 
            excludeId={player1Id}
            label="Select Player 2"
          />
        </div>

        {player1 && player2 && (
          <div className="space-y-6 animate-fade-in">
            {/* Player Headers */}
            <div className="grid grid-cols-2 gap-4">
              {[player1, player2].map((player, idx) => (
                <div key={player.id} className="bg-card rounded-xl p-4 border border-border/50 text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-navy-medium flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {player.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                    <Trophy className="w-3.5 h-3.5" />
                    Rank #{getPlayerRank(player.id.toString())} ({rankingType})
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Comparison */}
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <h4 className="font-display uppercase text-sm text-muted-foreground mb-4 text-center">
                {rankingType} Statistics
              </h4>
              
              <ComparisonStat 
                label="Overall Score"
                value1={player1[rankingType].overallScore}
                value2={player2[rankingType].overallScore}
              />
              <ComparisonStat 
                label="Matches Played"
                value1={player1[rankingType].matchesPlayed}
                value2={player2[rankingType].matchesPlayed}
              />
              <ComparisonStat 
                label="Latest Score"
                value1={player1[rankingType].weeklyScores[player1[rankingType].weeklyScores.length - 1]}
                value2={player2[rankingType].weeklyScores[player2[rankingType].weeklyScores.length - 1]}
              />
              <ComparisonStat 
                label="Best Week"
                value1={Math.max(...player1[rankingType].weeklyScores)}
                value2={Math.max(...player2[rankingType].weeklyScores)}
              />
              <ComparisonStat 
                label="Worst Week"
                value1={Math.min(...player1[rankingType].weeklyScores)}
                value2={Math.min(...player2[rankingType].weeklyScores)}
              />
              <ComparisonStat 
                label="Average Score"
                value1={(player1[rankingType].weeklyScores.reduce((a, b) => a + b, 0) / player1[rankingType].weeklyScores.length).toFixed(1)}
                value2={(player2[rankingType].weeklyScores.reduce((a, b) => a + b, 0) / player2[rankingType].weeklyScores.length).toFixed(1)}
              />
            </div>

            {/* Score Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{player1.name}</span>
                  <span className="font-display font-bold text-primary">{player1[rankingType].overallScore}</span>
                </div>
                <ScoreBar score={player1[rankingType].overallScore} showLabel={false} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{player2.name}</span>
                  <span className="font-display font-bold text-primary">{player2[rankingType].overallScore}</span>
                </div>
                <ScoreBar score={player2[rankingType].overallScore} showLabel={false} />
              </div>
            </div>
          </div>
        )}

        {(!player1 || !player2) && (
          <div className="text-center py-10 text-muted-foreground">
            Select two players to compare their statistics
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlayerComparison;
