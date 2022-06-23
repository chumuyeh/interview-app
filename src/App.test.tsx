import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

it('renders without error', () => {
  const component = render(<Provider store={store}><App /></Provider>);

  expect(component.container.innerHTML).toBeTruthy();
});
