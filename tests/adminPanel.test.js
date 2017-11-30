import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AdminPanel from '../client/src/AdminPanel.jsx';
import AdminTipList from '../client/src/AdminTipList.jsx';
import AdminTipEntry from '../client/src/AdminTipEntry.jsx';

configure({ adapter: new Adapter() });

describe('<AdminPanel />', () => {
  it('renders 1 admin component', () => {
    const component = shallow(<AdminPanel />);
    expect(component).toHaveLength(1);
  });

  it('renders AdminTipList component', () => {
    const tips = [
      {
        city: 'San Francisco',
        state: 'CA',
        name: 'amy',
        tiptext: 'hello world',
        datecreated: '2017-11-18 09:09:09'
      }
    ];
    const component = shallow(<AdminTipList tips={tips} />);
    expect(component).toHaveLength(1);
  });

  it('renders AdminTipEntry component', () => {
    const tip = {
      city: 'San Francisco',
      state: 'CA',
      name: 'amy',
      tiptext: 'hello world',
      datecreated: '2017-11-18 09:09:09'
    };
    const component = shallow(<AdminTipEntry tip={tip} />);
    expect(component).toHaveLength(1);
  });
});
