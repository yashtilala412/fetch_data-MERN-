import React from 'react';
import CreateIdolForm from './components/createIdol';
import ReadIdols from './components/readIdols';
import UpdateIdolForm from './components/updateIdol';
import DeleteIdolButton from './components/deleteIdol';

function App() {
  return (
    <div>
      <CreateIdolForm />
      <ReadIdols />
      {/* <UpdateIdolForm idolId="661025b950425a8d570ceca8" />
      <DeleteIdolButton idolId="661025b950425a8d570ceca8" /> */}
    </div>
  );
}

export default App;
