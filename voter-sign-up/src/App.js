import React from 'react';
import VoterList from './component/VoterList';
import VoterFormWithImage from './component/VoterFormWithImage';

function App() {
  return (
    <div className="App">
      <VoterFormWithImage />
      <VoterList />
    </div>
  );
}

export default App;
