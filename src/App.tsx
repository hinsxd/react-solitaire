import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';
import './App.css';
import { useDeck, Card } from './useDeck';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2)
    },
    cardPaper: {
      padding: theme.spacing(1),
      height: theme.spacing(2)
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  const [selected, setSelected] = useState<{ x: number; y: number } | null>(
    null
  );

  const {
    tableau,
    foundation,
    stock,
    waste,
    dispatch,
    move,
    reset
  } = useDeck();

  const handleSelect = (x: number, y: number) => (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (y !== 0) {
      return;
    }
    setSelected({ x, y: 0 });
  };
  return (
    <Container fixed>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={2}
      >
        {tableau.map((column, i) => (
          <Grid
            item
            xs={1}
            container
            direction="column-reverse"
            spacing={1}
            key={`column${i}`}
          >
            {column.map(({ flipped, rankName, suitName }, j) => (
              <Grid
                item
                key={`${suitName}${rankName}`}
                onClick={handleSelect(i, j)}
              >
                <Paper className={classes.cardPaper}>
                  <span>{flipped ? `${suitName} ${rankName}` : '--'}</span>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
