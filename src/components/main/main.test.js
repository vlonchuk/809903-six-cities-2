import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main';

it(`Main correctly renders after relaunch`, () => {
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
      id: `prop-5`,
      caption: `Nice, cozy, warm big bed apartment`,
    },
  ];

  const tree = renderer
    .create(<Main
      properties={properties}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
