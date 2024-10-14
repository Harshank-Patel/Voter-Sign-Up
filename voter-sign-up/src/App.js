import React from 'react';
import VoterForm from './component/VoterForm';
import FooterForm from './component/FooterForm';
import HeaderForm from './component/HeaderForm';

function App() {
  return (
    <div className="App">
      <HeaderForm />
      <VoterForm />
      <FooterForm />
    </div>
  );
}

export default App;
