import { screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About', () => {
  test('a página deve conter as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutParagraph1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutParagraph1).toBeDefined();

    const aboutParagraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(aboutParagraph2).toBeDefined();
  });

  test('a página deve conter um heading h2 com o texto `About Pokédex`', () => {
    renderWithRouter(<About />);

    const headingAbout = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(headingAbout).toBeDefined();
  });

  test('a página deve conter a imagem da Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');
    // const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    // console.log(image);
    // expect(image.src).toContain(imageUrl);
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
