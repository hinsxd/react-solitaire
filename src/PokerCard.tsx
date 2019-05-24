import React from 'react';
import clsx from 'clsx';
import { Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card } from './useDeck';
// import { createStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: '100px',
      width: '72px',
      padding: theme.spacing(0.5),
      fontSize: theme.spacing(2),
      border: '2px solid #333'
    },
    empty: {
      border: '2px dotted #333'
    },
    red: {
      color: 'red'
    }
  })
);

type Props = { card?: Card };

const PokerCard: React.FC<Props> = ({ card }) => {
  const classes = useStyles();
  if (!card) {
    return <Paper className={clsx(classes.card, classes.empty)} />;
  }
  return (
    <Paper
      className={clsx(classes.card, {
        [classes.red]: card && card.suit % 2 !== 0
      })}
      elevation={4}
    >
      {card.flipped && `${card.suitName} ${card.rankName}`}
    </Paper>
  );
};

export default PokerCard;
