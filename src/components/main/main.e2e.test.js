import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main';

Enzyme.configure({adapter: new Adapter()});

it(`App is correctly rendered after relaunch`, () => {
  const properties = [
    {
      id: `prop-1`,
      caption: `Beautiful & luxurious apartment at great location`,
    }
  ];

  const clickHandler = jest.fn();
  const app = shallow(<Main
    properties={properties}
    onClick={clickHandler} />);
  const anchor = app.find(`.place-card__name > a`);
  anchor.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
