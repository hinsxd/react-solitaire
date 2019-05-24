import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, CssBaseline, Box } from '@material-ui/core';
import './App.css';
import { useDeck, Card } from './useDeck';
import PokerCard from './PokerCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2)
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
    draw,
    reset
  } = useDeck();

  const handleClick = (x: number, y: number) => () => {
    // if (y !== 0) {
    //   return;
    // }
    if (!selected) {
      setSelected({ x, y: 0 });
    } else {
      move({ from: selected.x, to: x });
      setSelected(null);
    }
  };

  const handleEmptyColumnClick = (x: number) => () => {
    if (selected) {
      move({ from: selected.x, to: x });
      setSelected(null);
    }
  };
  return (
    <>
      <CssBaseline />
      <Container fixed maxWidth="md" style={{ border: '1px solid black' }}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item>1</Grid>
          <Grid item>2</Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={1}
        >
          {tableau.map((column, i) => (
            <Grid item xs key={`column${i}`} container>
              <Box position="relative" flex={1} alignItems="center">
                {[...column].reverse().map((card, j) => (
                  <Box
                    key={`${card.suitName}${card.rankName}`}
                    position="absolute"
                    top={j * 30}
                    onClick={handleClick(i, j)}
                  >
                    <PokerCard card={card} />
                  </Box>
                ))}
                {column.length === 0 && (
                  <Grid item onClick={handleEmptyColumnClick(i)}>
                    <PokerCard />
                  </Grid>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default App;
