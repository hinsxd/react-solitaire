import React from 'react';
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

  const {
    state: { tableau, foundation, stock, waste },
    dispatch
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
        {tableau.map(column => (
          <Grid item xs container direction="column">
            {column.map(card => (
              <Grid item>
                <Paper className={classes.cardPaper}>
                  {card.suitName}
                  {card.rankName}
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
