// src/App.js
import React from 'react';
import './App.css';
import InventoryTables from './InventoryTables';

function App() {
  return (
    <div className="App" style={{ display: 'flex', gap: '20px', justifyContent: 'space-around'}}>
      <InventoryTables />
    </div>
    
  );
}

export default App;
