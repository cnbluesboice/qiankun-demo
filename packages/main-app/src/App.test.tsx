import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Keys } from './App';
import App from './App';

test('renders learn react link', () => {
  render(<App menuStatus={Keys.DATA_SEARCH} cookie={{}} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
