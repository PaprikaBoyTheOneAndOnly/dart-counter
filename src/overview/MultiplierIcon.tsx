import React from 'react';
import { Box, Typography } from '@mui/material';
import { Color } from '../common/Color';
import { Multiplier } from '../game/GameTypes';
import { makeStyles } from 'tss-react/mui';

interface MultiplierIconProps {
  multiplier?: Multiplier;
}

export function MultiplierIcon({ multiplier }: MultiplierIconProps) {
  const { classes } = useMultiplierIconStyle();

  if (!multiplier || multiplier === 1) {
    return <></>;
  }

  return (
    <Box className={classes.dot}>
      <Typography className={classes.text}>{multiplier}</Typography>
    </Box>
  );
}

const useMultiplierIconStyle = makeStyles()({
  dot: {
    borderRadius: '50%',
    width: '1.5em',
    height: '1.5em',
    color: 'white',
    border: `1px solid ${Color.DARK_GREEN}`,
    backgroundColor: Color.GREEN,
  },
  text: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
