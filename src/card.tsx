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
