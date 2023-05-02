import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

const h2Heading = { name: /about pokédex/i };
const pokedexImg = { name: /pokédex/i };

test('Teste se a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const aboutPokDex = screen.getByRole('heading', h2Heading);
  const imagePokDex = screen.getByRole('img', pokedexImg);

  expect(aboutPokDex).toBeInTheDocument();
  expect(imagePokDex).toHaveAttribute(
    'src',
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
