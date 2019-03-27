import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from '../index';

describe('<LoginPage />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(<LoginPage />);
    expect(renderedComponent.contains(<h1>Login</h1>)).toBe(true);
  });
});
