const ScoreBar = ({ score, maxScore = 100, label, showLabel = true, delay = 0 }) => {
  const percentage = (score / maxScore) * 100;

  const getScoreColor = (score) => {
    if (score >= 90) return "bg-accent";
    if (score >= 80) return "bg-navy-medium";
    if (score >= 70) return "bg-steel";
    return "bg-silver";
  };

  return (
    <div className="w-full">
      {showLabel && label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-muted-foreground font-medium">{label}</span>
          <span className="text-sm font-bold text-foreground">{score}</span>
        </div>
      )}
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getScoreColor(score)}`}
          style={{
            width: `${percentage}%`,
            animationDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};

export default ScoreBar;