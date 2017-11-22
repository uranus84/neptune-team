const modules = require('../client/src/App.jsx');
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../client/src/App.jsx';
import MappComponent from '../client/src/MappComponent.jsx';
import renderer from 'react-test-renderer';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// note: use 'u' to update upon render with acceptable changes
it('renders a snapshot of App Component1', () => {
  const tree = renderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('<App />', () => {
  it('renders 1 app component', () => {
    const component = shallow(<App />);
    expect(component).toHaveLength(1);
  })
})

