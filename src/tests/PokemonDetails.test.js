import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente `Pokemon`', () => {
  const pikachu = pokemons[0];

  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pikachu.id}`);
  });

  test('A página contem as informações detalhadas do pokemon selecionado', () => {
    const pokemonsDetailsPage = screen.getByRole('heading',
      { name: `${pikachu.name} Details`, level: 2 });
    expect(pokemonsDetailsPage).toBeDefined();

    const summary = screen.getByRole('heading',
      { name: /Summary/i, level: 2 });
    expect(summary).toBeDefined();

    const paragraphDetails = screen
      .getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraphDetails).toBeInTheDocument();
  });

  test('A página deve conter uma seção com mapas das localizações do pokemon', () => {
    const mapsSection = screen.getByRole('heading',
      { name: `Game Locations of ${pikachu.name}`, level: 2 });
    expect(mapsSection).toBeDefined();

    const mapsName = screen.getAllByAltText(`${pikachu.name} location`);
    expect(mapsName[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(screen.getByText('Kanto Viridian Forest')).toBeDefined();
  });

  test('A página deve permitir o usuário favoritar o pokemon', () => {
    const favoriteCheckbox = screen.getByLabelText(/Pokémon Favoritado?/i);
    userEvent.click(favoriteCheckbox);

    const starIcon = screen.getByAltText(`${pikachu.name} is marked as favorite`);
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(favoriteCheckbox);
    expect(starIcon).not.toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    expect(starIcon).toBeDefined();
  });
});
