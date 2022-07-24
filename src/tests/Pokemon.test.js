import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente `Pokemon`', () => {
  const pikachu = pokemons[0];

  test('O card do pokémon deve ser renderizado corretamente', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pikachu.name);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pikachu.type);
    const pokemon = screen.getByTestId('pokemon-weight');
    expect(pokemon).toHaveTextContent(
      `Average weight: ${pikachu.averageWeight.value} ${pikachu
        .averageWeight.measurementUnit}`,
    );
    const pokemonImg = screen.getByAltText(`${pikachu.name} sprite`);
    expect(pokemonImg).toHaveAttribute('src', pikachu.image);
  });

  test('O link de navegação deve redirecionar à página de detalhes do pokemon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${pikachu.id}`);

    userEvent.click(detailsLink);
    const pokemonsDetailsPage = screen.getByRole('heading',
      { name: `${pikachu.name} Details`, level: 2 });
    expect(pokemonsDetailsPage).toBeDefined();

    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pikachu.id}`);
    expect(pokemonsDetailsPage).toBeDefined();
  });

  test('Se o pokemon está favoritado deve ter um ícone de estrela no card do pokemon',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${pikachu.id}`);

      userEvent.click(screen.getByRole('checkbox'));

      const starIcon = screen.getByAltText(`${pikachu.name} is marked as favorite`);
      expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    });
});
