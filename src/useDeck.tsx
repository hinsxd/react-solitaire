import { useReducer } from 'react';
import produce from 'immer';
import shuffle from 'lodash/shuffle';
import range from 'lodash/range';
import flatMap from 'lodash/flatMap';
import flow from 'lodash/flow';

import { Suit, rankNames } from './const';

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
  | { type: 'move'; from: number; to: number }
  | { type: 'draw'; count?: number };

export const makeCard = (rank: number, suit: Suit): Card => {
  const rankName = rankNames[rank];
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

const reducer = (state: State, action: Action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'test':
        draft = init(true);
        return;
      case 'reset':
        draft = init();
        return;
      case 'move':
        const { from, to } = action;

        // same position
        if (from === to) return;

        // move from empty column
        if (draft.tableau[from].length === 0) return;

        const fromColumnTop = draft.tableau[from][0];
        const toColumnTop = draft.tableau[to][0];

        // same color
        // if ((fromColumnTop.suit - toColumnTop.suit) % 2 === 0) return;

        // To column top rank is NOT one larger than from column top rank
        // if (toColumnTop.rank - fromColumnTop.rank !== 1) return;

        // get one card from column head
        const card = draft.tableau[from].shift();

        // flip new card at column head
        if (draft.tableau[from][0]) {
          draft.tableau[from][0].flipped = true;
        }

        if (card) {
          // insert card to destination head
          draft.tableau[to].unshift(card);
        }
        return;
      case 'draw':
        return;
      default:
        throw new Error('Invalid action');
    }
  });

export const useDeck = () => {
  const [{ foundation, tableau, stock, waste }, dispatch] = useReducer(
    reducer,
    undefined,
    init
  );
  const reset = () => dispatch({ type: 'reset' });
  const move = ({ from, to }: { from: number; to: number }) =>
    dispatch({ type: 'move', from, to });
  const draw = ({ count }: { count?: number }) =>
    dispatch({ type: 'draw', count });
  return { foundation, tableau, stock, waste, dispatch, reset, move, draw };
};
