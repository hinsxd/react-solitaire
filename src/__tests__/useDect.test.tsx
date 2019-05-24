import React from 'react';
import ReactDOM from 'react-dom';
import { renderHook, act } from 'react-hooks-testing-library';
import { useDeck } from '../useDeck';

test('should initialize', () => {
  const { result } = renderHook(() => useDeck());

  expect(result.current.waste).toStrictEqual([]);
  expect(result.current.foundation).toStrictEqual([[], [], [], []]);
  expect(result.current.tableau.map(column => column.length)).toStrictEqual([
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ]);
  expect(result.current.stock.length).toBe(24);
});

test('should move 1 card if movable', () => {
  const { result } = renderHook(() => useDeck());

  act(() => result.current.dispatch({ type: 'test' }));

  expect(result.current.tableau[1]).toStrictEqual([
    { rankName: '2', suitName: '♠', rank: 2, suit: 0, flipped: true },
    { rankName: '3', suitName: '♠', rank: 3, suit: 0, flipped: false }
  ]);
  expect(result.current.tableau[5]).toStrictEqual([
    { rankName: '3', suitName: '♥', rank: 3, suit: 1, flipped: true },
    { rankName: '4', suitName: '♥', rank: 4, suit: 1, flipped: false },
    { rankName: '5', suitName: '♥', rank: 5, suit: 1, flipped: false },
    { rankName: '6', suitName: '♥', rank: 6, suit: 1, flipped: false },
    { rankName: '7', suitName: '♥', rank: 7, suit: 1, flipped: false },
    { rankName: '8', suitName: '♥', rank: 8, suit: 1, flipped: false }
  ]);

  act(() => result.current.move({ from: 1, to: 5 }));

  expect(result.current.tableau[1]).toStrictEqual([
    { rankName: '3', suitName: '♠', rank: 3, suit: 0, flipped: true }
  ]);
  expect(result.current.tableau[5]).toStrictEqual([
    { rankName: '2', suitName: '♠', rank: 2, suit: 0, flipped: true },
    { rankName: '3', suitName: '♥', rank: 3, suit: 1, flipped: true },
    { rankName: '4', suitName: '♥', rank: 4, suit: 1, flipped: false },
    { rankName: '5', suitName: '♥', rank: 5, suit: 1, flipped: false },
    { rankName: '6', suitName: '♥', rank: 6, suit: 1, flipped: false },
    { rankName: '7', suitName: '♥', rank: 7, suit: 1, flipped: false },
    { rankName: '8', suitName: '♥', rank: 8, suit: 1, flipped: false }
  ]);
});

it('should not move when same color', () => {
  const { result } = renderHook(() => useDeck());
  act(() => result.current.dispatch({ type: 'test' }));

  expect(result.current.tableau[0]).toStrictEqual([
    { rankName: 'A', suitName: '♠', rank: 1, suit: 0, flipped: true }
  ]);
  expect(result.current.tableau[1]).toStrictEqual([
    { rankName: '2', suitName: '♠', rank: 2, suit: 0, flipped: true },
    { rankName: '3', suitName: '♠', rank: 3, suit: 0, flipped: false }
  ]);

  act(() => result.current.move({ from: 0, to: 1 }));

  expect(result.current.tableau[0]).toStrictEqual([
    { rankName: 'A', suitName: '♠', rank: 1, suit: 0, flipped: true }
  ]);
  expect(result.current.tableau[1]).toStrictEqual([
    { rankName: '2', suitName: '♠', rank: 2, suit: 0, flipped: true },
    { rankName: '3', suitName: '♠', rank: 3, suit: 0, flipped: false }
  ]);
});
