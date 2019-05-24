import { useState, useReducer } from 'react';
import produce from 'immer';
import shuffle from 'lodash/shuffle';
import range from 'lodash/range';
import flatMap from 'lodash/flatMap';
import flow from 'lodash/flow';
export enum Suit {
  '♠',
  '♥',
  '♦',
  '♣'
}

export type Card = {
  rankName: string;
  suitName: string;
  rank: number;
  suit: Suit;
  flipped: boolean;
};

export type Action =
  | { type: 'test' }
  | { type: 'reset' }
  | { type: 'move'; from: number; to: number };
export const rankNames = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K'
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

const orderedDeck = () =>
  range(4) // 4 Suits
    .map(s =>
      range(1, 14) // 13 ranks
        .map(
          r => makeCard(r, s) //Generate a Card object
        )
    );

const init = (test?: boolean): State => {
  const cards: Card[] = flow(
    flatMap,
    !test ? shuffle : x => x
  )(orderedDeck());
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
    case 'test':
      return init(true);
    case 'reset':
      return init();
    case 'move':
      const { from, to } = action;
      if (from === to) return state;
      if (state.tableau[from].length === 0) return state;
      const fromColumnTop = state.tableau[from][0];
      const toColumnTop = state.tableau[to][0];
      if (
        state.tableau[to].length > 0 &&
        (fromColumnTop.suit - toColumnTop.suit) % 2 !== 0 && // Not same color
        toColumnTop.rank - fromColumnTop.rank === 1 // To column top rank is NOT one larger than from column top rank
      ) {
        return produce(state, draft => {
          const card = draft.tableau[from].shift();
          if (card) {
            draft.tableau[to].unshift(card);
            draft.tableau[from][0].flipped = true;
          }
        });
      }
      return state;

    default:
      throw new Error('Invalid action');
  }
};

export const useDeck = () => {
  const [{ foundation, tableau, stock, waste }, dispatch] = useReducer(
    reducer,
    undefined,
    init
  );
  const reset = () => dispatch({ type: 'reset' });
  const move = ({ from, to }: { from: number; to: number }) =>
    dispatch({ type: 'move', from, to });
  return { foundation, tableau, stock, waste, dispatch, reset, move };
};
