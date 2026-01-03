import ScoreBar from "./ScoreBar";

interface WeeklyScoreChartProps {
  scores: number[];
  playerName?: string;
}

const WeeklyScoreChart = ({ scores, playerName }: WeeklyScoreChartProps) => {
  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"];
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  return (
    <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
      {playerName && (
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Weekly Performance
        </h3>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <div className="text-2xl font-display font-bold text-accent">{maxScore}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Best</div>
        </div>
        <div className="text-center p-3 bg-secondary rounded-lg">
          <div className="text-2xl font-display font-bold text-foreground">{avgScore}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Average</div>
        </div>
        <div className="text-center p-3 bg-secondary rounded-lg">
          <div className="text-2xl font-display font-bold text-foreground">{minScore}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Lowest</div>
        </div>
      </div>

      <div className="space-y-3">
        {scores.map((score, index) => (
          <ScoreBar
            key={index}
            score={score}
            label={weekLabels[index]}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyScoreChart;
