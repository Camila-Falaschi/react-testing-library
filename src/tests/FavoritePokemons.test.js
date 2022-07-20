import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente `FavoritePokemons`', () => {
  test('A mensagem `No favorite pokemon found` é exibida se não tem pokemons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons />);

      expect(screen.getByText(/No favorite pokemon found/i)).toBeDefined();
    });
  test('Os cards dos Pokemons favoritados são exibidos caso existam', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonsInfo = [
      { name: 'Snorlax', number: 143 },
      { name: 'Pikachu', number: 25 },
      { name: 'Mew', number: 151 }];

    pokemonsInfo.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.number}`);
      const pokemonHeading = screen.getByRole('heading', {
        name: `${pokemon.name} Details`,
        level: 2,
      });
      expect(pokemonHeading).toBeDefined();

      userEvent.click(screen.getByRole('checkbox'));
    });

    history.push('/favorites');

    pokemonsInfo.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });
});
