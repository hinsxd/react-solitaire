import React from 'react';
import './App.css';
import { useDeck } from './useDeck';
const App: React.FC = () => {
  const {
    state: { tableau, foundation, stock, waste },
    dispatch,
    move,
    reset
  } = useDeck();
  console.log('Tableau:', tableau);
  console.log('Stock:', stock);
  return (
    <div className="App">
      Watch console
      <button onClick={reset}>Reset</button>
      <button onClick={() => move({ from: 1, to: 2 })}>from 1 to 2</button>
    </div>
  );
};

export default App;
