import { Color } from './Color';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

interface TileProps {
  text: string | number;
  isActive?: boolean;

  onClick(): void;
}

export function Tile({ text, onClick, isActive = false }: TileProps) {
  const { classes } = useTileStyle({ active: !!isActive });

  return (
    <Grid className={classes.tile} item xs={3} onClick={onClick}>
      <Typography textAlign='center' align='center'>
        {text}
      </Typography>
    </Grid>
  );
}

const useTileStyle = makeStyles<{ active: boolean }>()((theme, { active }) => ({
  tile: {
    padding: '0.5em',
    '& > *': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '3em',
      border: `1px solid ${Color.GREY}`,
      borderRadius: '5px',
      backgroundColor: active ? Color.GREEN : 'none',
    },
  },
}));
