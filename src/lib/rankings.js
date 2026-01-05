// Utility functions for ranking calculations

export const getOverallScore = (player) => {
  return Math.round((player.singles.overallScore + player.doubles.overallScore) / 2);
};

export const getOverallMatches = (player) => {
  return player.singles.matchesPlayed + player.doubles.matchesPlayed;
};

export const getOverallWeeklyScores = (player) => {
  // Average the weekly scores from singles and doubles
  return player.singles.weeklyScores.map((score, index) => 
    Math.round((score + player.doubles.weeklyScores[index]) / 2)
  );
};

export const getPlayerData = (player, rankingType) => {
  if (rankingType === "overall") {
    return {
      overallScore: getOverallScore(player),
      matchesPlayed: getOverallMatches(player),
      weeklyScores: getOverallWeeklyScores(player)
    };
  }
  return player[rankingType];
};

export const sortPlayersByRanking = (players, rankingType) => {
  return [...players].sort((a, b) => {
    const scoreA = rankingType === "overall" ? getOverallScore(a) : a[rankingType].overallScore;
    const scoreB = rankingType === "overall" ? getOverallScore(b) : b[rankingType].overallScore;
    return scoreB - scoreA;
  });
};
