import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente `NotFound`', () => {
  test('a página deve conter um heading com o texto `Page requested not found 😭`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-test');

    const headingNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(headingNotFound).toBeDefined();
  });

  test('a página deve conter a imagem do Pikachu', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-test');

    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
