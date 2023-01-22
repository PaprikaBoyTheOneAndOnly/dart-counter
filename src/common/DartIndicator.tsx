import { Color } from './Color';
import { Grid, RegularBreakpoints } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

interface DartIndicatorProps {
  number: 1 | 2 | 3 | number;
}

export function DartIndicator({ number, xs, md, xl, sm, lg }: DartIndicatorProps & RegularBreakpoints) {
  const { classes, cx } = useIndicatorStyles();

  return (
    <Grid className={classes.indicatorContainer} container item xs={xs} md={md} xl={xl} sm={sm} lg={lg}>
      <Grid className={cx({ [classes.active]: isActive(1) })} item xs={12} />
      <Grid className={cx({ [classes.active]: isActive(2) })} item xs={12} />
      <Grid className={cx({ [classes.active]: isActive(3) })} item xs={12} />
    </Grid>
  );

  function isActive(indicatorTile: number) {
    const maxDarts = 3;

    return maxDarts - indicatorTile >= number;
  }
}

const useIndicatorStyles = makeStyles()({
  indicatorContainer: {
    '& > *': {
      height: '1em',
      backgroundColor: Color.GREY,
      margin: '3px!important',
    },
  },
  active: {
    backgroundColor: `${Color.GREEN}!important`,
  },
});
