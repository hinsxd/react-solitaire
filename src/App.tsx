import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';
import './App.css';
import { useDeck, Card } from './useDeck';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2)
    },
    cardPaper: {}
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const [{ from, to }, setMove] = useState({ from: 1, to: 2 });
  const {
    state: { tableau, foundation, stock, waste },
    dispatch,
    move,
    reset
  } = useDeck();

  return (
    <Container fixed>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}
      >
        {tableau.map((column, i) => (
          <Grid
            item
            xs
            container
            direction="column-reverse"
            spacing={3}
            key={`column${i}`}
          >
            {column.map((card, j) => (
              <Grid item key={`${card.suitName}${card.rankName}`}>
                <Paper className={classes.cardPaper}>
                  {card.suitName}
                  {card.rankName}
                  {card.flipped && 'flipped'}
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      <div>
        From:{' '}
        <input
          value={from}
          type="number"
          onChange={({ currentTarget: { value = 1 } }) =>
            setMove(ori => ({ ...ori, from: +value }))
          }
        />
        To:{' '}
        <input
          value={to}
          type="number"
          onChange={({ currentTarget: { value = 1 } }) =>
            setMove(ori => ({ ...ori, to: +value }))
          }
        />
        <button onClick={() => move({ from, to })}>Move</button>
      </div>
    </Container>
  );
};

export default App;
