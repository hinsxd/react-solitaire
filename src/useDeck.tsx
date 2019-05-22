import { useState, useReducer } from 'react';
import produce from 'immer';
import shuffle from 'lodash/shuffle';
import range from 'lodash/range';
export enum Suit {
  Spades,
  Hearts,
  Clubs,
  Diamonds
}

export type Card = {
  rankName: string;
  suitName: string;
  rank: number;
  suit: Suit;
  flipped: boolean;
};

const rankNames = [
  'Ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King'
];

export const makeCard = (rank: number, suit: Suit): Card => {
  const rankName = rankNames[rank - 1];
  const suitName = Suit[suit];
  return { rankName, suitName, rank, suit, flipped: false };
};

type State = {
  foundation: Card[][];
  tableau: Card[][];
  stock: Card[];
  waste: Card[];
};

type Action = { type: 'reset' } | { type: 'move'; from: number; to: number };

const init = (): State => {
  const cards: Card[] = shuffle(
    range(4) // 4 Suits
      .map(s =>
        range(1, 14) // 13 ranks
          .map(
            r => makeCard(r, s) //Generate a Card object
          )
      )
      .flat() // Make 1d array
  );

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
    case 'move':
      const { from, to } = action;

      return produce(state, draft => {
        const card = draft.tableau[from].shift();
        draft.tableau[from][0].flipped = true;
        if (card) {
          draft.tableau[to].unshift(card);
        }
      });
    default:
      throw new Error('Invalid action');
  }
};

export const useDeck = () => {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const reset = () => dispatch({ type: 'reset' });
  const move = ({ from, to }: { from: number; to: number }) =>
    dispatch({ type: 'move', from, to });
  return { state, dispatch, reset, move };
};
