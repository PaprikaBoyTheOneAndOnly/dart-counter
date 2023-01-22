import React, { useMemo, useState } from 'react';
import { ArrayElement } from '../common/types';
import { Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import { MultiplierIcon } from './MultiplierIcon';
import { Round } from '../game/GameTypes';
import { makeStyles } from 'tss-react/mui';

interface OverviewProps {
  game: Round[];
}

export function Overview({ game }: OverviewProps) {
  const players = useMemo(extractPlayers, []);
  const [player, setPlayer] = useState(players[0]);

  const { classes } = useOverviewStyles();

  return (
    <Container>
      <Tabs
        value={player}
        onChange={(e, player) => setPlayer(player)}
        variant='scrollable'
        scrollButtons
        allowScrollButtonsMobile
      >
        {players.map(player => (
          <Tab key={`player-${player}`} label={`Player ${player}`} />
        ))}
      </Tabs>
      <Grid container>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <Typography className={classes.text} align='center'>
              Runde
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.text} align='center'>
              Darts
            </Typography>
          </Grid>
        </Grid>
        {getPlayerHistory(player).map(({ darts }, round) => (
          <Grid key={`history-${round}`} container item xs={12}>
            <Grid item xs={6}>
              <Typography className={classes.text} align='center'>
                {round + 1}
              </Typography>
            </Grid>
            <Grid container item xs={6}>
              <Grid className={classes.dartValue} item xs={6}>
                <Typography>{darts[0]?.point}</Typography>
              </Grid>
              <Grid className={classes.dartValue} item xs={6}>
                <MultiplierIcon multiplier={darts[0]?.multiplier} />
              </Grid>
              <Grid className={classes.dartValue} item xs={6}>
                <Typography>{darts[1]?.point}</Typography>
              </Grid>
              <Grid className={classes.dartValue} item xs={6}>
                <MultiplierIcon multiplier={darts[1]?.multiplier} />
              </Grid>
              <Grid className={classes.dartValue} item xs={6}>
                <Typography>{darts[2]?.point}</Typography>
              </Grid>
              <Grid className={classes.dartValue} item xs={6}>
                <MultiplierIcon multiplier={darts[2]?.multiplier} />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  function extractPlayers(): number[] {
    return game.reduce((players, round) => {
      if (!players.includes(round.player)) {
        players.push(round.player);
        return players;
      }

      return players;
    }, [] as number[]);
  }

  function getPlayerHistory(player: number): Round[] {
    return game.filter(round => player === round.player);
  }
}

function DartValue({ dart }: { dart?: ArrayElement<Round['darts']> }) {
  const { classes } = useOverviewStyles();
  return (
    <>
      <Grid className={classes.dartValue} item xs={6}>
        <Typography>{dart?.point}</Typography>
      </Grid>
      <Grid className={classes.dartValue} item xs={6}>
        <MultiplierIcon multiplier={dart?.multiplier} />
      </Grid>
    </>
  );
}

const useOverviewStyles = makeStyles()({
  dartValue: {
    height: '2.5em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
