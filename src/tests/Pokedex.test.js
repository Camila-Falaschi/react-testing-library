import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente `Pokedex`', () => {
  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('a página deve conter um heading `Encountered pokémons`', () => {
    const heading = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(heading).toBeDefined();
  });

  test('É exibido o próximo pokémon da lista quando o botão `Próximo pokémon` é clicado',
    () => {
      const pokemonsList = pokemons;

      const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(buttonNext).toBeDefined();

      pokemonsList.forEach((pokemon) => {
        const pokemonName = pokemon.name;
        expect(screen.getByText(pokemonName)).toBeInTheDocument();
        userEvent.click(buttonNext);
      });

      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });

  test('É mostrado apenas um pokémon por vez', () => {
    const currentPokemon = screen.getAllByTestId('pokemon-name');
    expect(currentPokemon.length).toBe(1);

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    expect(pokemon).not.toHaveTextContent('Charmander');

    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(buttonNext);
    expect(pokemon).not.toHaveTextContent('Pikachu');
    expect(pokemon).toHaveTextContent('Charmander');
  });

  test('A Pokédex deve ter botões de filtro', () => {
    types.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toBeDefined();

      userEvent.click(buttonType);

      const pokemonTypeCard = screen.getByTestId('pokemon-type');
      expect(pokemonTypeCard).toHaveTextContent(type);

      const nextButton = screen.getByTestId('next-pokemon');
      if (type === 'Fire' || type === 'Psychic') {
        expect(nextButton).not.toBeDisabled();
        userEvent.click(nextButton);
        expect(pokemonTypeCard).toHaveTextContent(type);
      } else {
        expect(nextButton).toBeDisabled();
      }
    });

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const typeButtonsQuantity = 7;
    expect(typeButtons.length).toBe(typeButtonsQuantity);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).not.toBeDisabled();
  });

  test('A Pokédex deve conter um botão para resetar o filtro selecionado', () => {
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).not.toBeDisabled();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const bugTypeButton = screen.getByRole('button', { name: /Bug/i });
    userEvent.click(bugTypeButton);
    expect(nextButton).toBeDisabled();
    expect(pokemonType).toHaveTextContent('Bug');

    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);
  });
});
