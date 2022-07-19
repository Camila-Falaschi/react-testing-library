import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente App', () => {
  test('a aplicação deve conter um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    const linkToHome = screen.getByRole('link', { name: /Home/i });
    expect(linkToHome).toBeDefined();

    const linkToAbout = screen.getByRole('link', { name: /About/i });
    expect(linkToAbout).toBeDefined();

    const linkToFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkToFavorite).toBeDefined();
  });

  test('ao clicar no link `Home` a aplicação é redirecionada para a página inicial',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/about');

      const headingAbout = screen.getByRole('heading', {
        name: /About Pokédex/i,
        level: 2,
      });
      expect(headingAbout).toBeDefined();

      const linkToHome = screen.getByRole('link', { name: /Home/i });
      expect(linkToHome).toBeDefined();

      userEvent.click(linkToHome);

      const headingHome = screen.getByRole('heading', {
        name: /Encountered pokémons/i,
        level: 2,
      });
      expect(headingHome).toHaveTextContent(/Encountered pokémons/i);
      expect(headingAbout).not.toBeInTheDocument();
    });

  test('ao clicar no link `About` a aplicação é redirecionada para a página inicial',
    () => {
      renderWithRouter(<App />);

      const headingHome = screen.getByRole('heading', {
        name: /Encountered pokémons/i,
        level: 2,
      });
      expect(headingHome).toBeDefined();

      const linkToAbout = screen.getByRole('link', { name: /About/i });
      expect(linkToAbout).toBeDefined();

      userEvent.click(linkToAbout);

      const headingAbout = screen.getByRole('heading', {
        name: /About Pokédex/i,
        level: 2,
      });
      expect(headingAbout).toHaveTextContent(/About Pokédex/i);
      expect(headingHome).not.toBeInTheDocument();
    });

  test(`ao clicar no link 'Favorite Pokémons' a aplicação é redirecionada para a
  página inicial`, () => {
    renderWithRouter(<App />);

    const headingHome = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(headingHome).toBeDefined();

    const linkToFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkToFavorite).toBeDefined();

    userEvent.click(linkToFavorite);

    const headingFavorite = screen.getByRole('heading', {
      name: /Favorite Pokémons/i,
      level: 2,
    });
    expect(headingFavorite).toHaveTextContent(/Favorite Pokémons/i);
    expect(headingHome).not.toBeInTheDocument();
  });

  test('a aplicação é direcionada à página `Not Found` ao entrar em uma URL deconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/non-existent-url');

      const headingNotFound = screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      });
      expect(headingNotFound).toBeDefined();
    });
});
