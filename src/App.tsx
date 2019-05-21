import React from 'react';
import './App.css';
import { useDeck } from './useDeck';
const App: React.FC = () => {
  const {
    state: { tableau, foundation, stock, waste },
    dispatch
  } = useDeck();
  console.log('Tableau:', tableau);
  console.log('Stock:', stock);
  return (
    <div className="App">
      Watch console
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
};

export default App;
