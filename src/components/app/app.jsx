import React from 'react';
import Main from './../main/main.jsx';

const App = () => {
  const properties = [
    {
      id: `prop-1`,
      caption: `Beautiful & luxurious apartment at great location`,
    },
    {
      id: `prop-2`,
      caption: `Wood and stone place`,
    },
    {
      id: `prop-3`,
      caption: `Canal View Prinsengracht`,
    },
    {
      id: `prop-4`,
      caption: `Nice, cozy, warm big bed apartment`,
    },
  ];

  return <section>
    <Main properties={properties} />
  </section>;
};

export default App;
