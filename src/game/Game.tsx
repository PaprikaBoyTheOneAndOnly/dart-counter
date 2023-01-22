import { Container, Grid, Typography } from '@mui/material';
import { DartIndicator } from '../common/DartIndicator';
import { Multiplier } from './GameTypes';
import { Tile } from '../common/Tile';
import { makeStyles } from 'tss-react/mui';
import { useGame } from './GameService';
import { useState } from 'react';

const BULL = 25;
const FAIL = 0;

export function Game() {
  const gameService = useGame(701, 2);
  const [multiplier, setMultiplier] = useState<Multiplier>(1);

  const { classes } = useGameStyles();

  return (
    <Container>
      <Grid container>
        <Grid container justifyContent='center' item xs={4}>
          <Typography fontSize='medium'>Player {gameService.currentRound.player}</Typography>
        </Grid>
        <DartIndicator number={gameService.currentRound.darts.length} xs={4} />
        <Grid container justifyContent='center' item xs={4}>
          <Typography fontSize='large'>{gameService.remainingPoints}</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.tiles} container sx={{ padding: '2em' }}>
        <Tile onClick={handleChangeMultiplier(2)} text='2x' isActive={multiplier === 2} />
        <Tile onClick={handleChangeMultiplier(3)} text='3x' isActive={multiplier === 3} />
        <Grid item xs={4} />
        <Gap />
        {[...Array(20).keys()].map((i, index) => (
          <Tile key={`point-${index + 1}`} text={index + 1} onClick={handlePointClicked(index + 1)} />
        ))}
        {multiplier !== 3 && <Tile text='Bull' onClick={handlePointClicked(BULL)} />}
        <Tile text='Fail' onClick={handlePointClicked(FAIL)} />
        <Grid item xs={3} />
        {gameService.currentRound.darts.length === 3 && <Tile text='Next' onClick={gameService.nextPlayer} />}
        <Grid item xs={12} height='1em' />
      </Grid>
    </Container>
  );

  function handlePointClicked(point: number) {
    return () => {
      gameService.addDart(multiplier, point);
      setMultiplier(1);
    };
  }

  function handleChangeMultiplier(multiplier: Multiplier) {
    return () => {
      setMultiplier(currentMultiplier => (currentMultiplier === multiplier ? 1 : multiplier));
    };
  }
}

const Gap = () => <Grid item xs={12} height='1em' />;

const useGameStyles = makeStyles()({
  tiles: {
    padding: '2em',
  },
});
