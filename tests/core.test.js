const modules = require('../client/src/App.jsx');
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../client/src/App.jsx';
import MappComponent from '../client/src/App.jsx';
import renderer from 'react-test-renderer';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PhotoInfo from '../client/src/Components/PhotoInfo';
import TipsList from '../client/src/Components/TipsList';
import WalkabilityInfo from '../client/src/Components/WalkabilityInfo';
import TweetBox from '../client/src/Components/TweetBox'

configure({ adapter: new Adapter() });

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

//note: use 'u' to update upon render with acceptable changes
// it('renders a snapshot of App Component1', () => {
//   const tree = renderer.create(<App/>).toJSON();
//   expect(tree).toMatchSnapshot();
// });

describe('<App />', () => {
  it('renders 1 app component', () => {
    const component = shallow(<App />);
    expect(component).toHaveLength(1);
  })
})


test('Should render photoInfo component', () => {
  const photo = shallow(<PhotoInfo photoUrl='Empty' />);
  expect(photo).toBeDefined();
});

test('Should render TipsList component', () => {
  const list = shallow(<TipsList info = {[{city:'sf',state: 'cali'}]}/>);
  expect(list).toBeDefined();
});

test('Should render TweetBox component', () => {
  const box = shallow(<TweetBox tweet= {{user:{screen_name:'Fred'}}}/>);
  expect(box).toBeDefined();
});

test('Should render WalkabilityInfo component', () => {
  const walkScore = shallow(<WalkabilityInfo/>);
  expect(walkScore).toBeDefined();
});