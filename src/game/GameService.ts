import { Multiplier, Round } from './GameTypes';
import { useEffect, useMemo, useState } from 'react';

export function useGame(maxPoints: number, players: number) {
  const [game, setGame] = useState<Round[]>([{ player: 1, darts: [] }]);

  useEffect(() => {
    console.log(game);
  }, [game]);

  const currentRound = useMemo(() => game[game.length - 1], [game.length]);

  return {
    addDart,
    nextPlayer,
    currentRound,
    remainingPoints: calculatePoints(),
  };

  function addDart(multiplier: Multiplier, point: number) {
    if (currentRound.darts.length < 3) {
      currentRound.darts.push({ point, multiplier });
      setGame(game.slice());
    }
  }

  function nextPlayer() {
    const player = currentRound.player < players ? currentRound.player + 1 : 1;

    game.push({ player: player, darts: [] });
    setGame(game.slice());
  }

  function calculatePoints() {
    const player = currentRound.player;
    const playerPoints = game
      .filter(round => round.player === player)
      .map(round => round.darts.reduce((roundTotal, dart) => roundTotal + dart.point * dart.multiplier, 0))
      .reduce((total, roundTotal) => total + roundTotal, 0);

    return maxPoints - playerPoints;
  }
}
