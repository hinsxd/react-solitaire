import { useState, useReducer } from 'react';
import { Card, makeCard } from './card';

type State = {
  foundation: Card[][];
  tableau: Card[][];
  stock: Card[];
  waste: Card[];
};

type Action = { type: 'reset' };

const init = (): State => {
  const cards: Card[] = [];

  // Generate new cards.
  for (let s = 0; s < 4; s++) {
    for (let r = 1; r <= 13; r++) {
      cards.push(makeCard(r, s));
    }
  }

  // Shuffle cards.
  for (let i = cards.length; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]];
  }

  const tableau: Card[][] = [];

  for (let i = 1, j = 0; i <= 7; i++) {
    const column = cards.slice(j, j + i);
    column[0].flipped = true;
    tableau.push(column);
    j += i;
  }

  const foundation: Card[][] = [[], [], [], []];
  const stock: Card[] = [...cards.slice(28)];
  const waste: Card[] = [];

  return { foundation, tableau, stock, waste };
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'reset':
      return init();
    default:
      throw new Error('Invalid action');
  }
};

export const useDeck = () => {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const reset = () => dispatch({ type: 'reset' });
  return { state, dispatch, reset };
};
