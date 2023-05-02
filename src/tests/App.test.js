import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const pokemonFavText = { name: /home/i };
const pokemonHomeText = { name: /about/i };
const pokemonAboutText = { name: /favorite pokémon/i };

test('Testa se a aplicação tem os nomes links: Home, About, Favorite Pokemon', () => {
  renderWithRouter(<App />); // testando se ta renderizando o app e as rotas

  const linkToHome = screen.getByRole('link', pokemonHomeText); // selecionando o link home
  const linkToAbout = screen.getByRole('link', pokemonAboutText); // selecionando o link about
  const linkToFavPokemon = screen.getByRole('link', pokemonFavText); // selecionando o favorite pokémon

  expect(linkToHome).toBeInTheDocument(); // vendo se ta no documento
  expect(linkToAbout).toBeInTheDocument(); // vendo se ta no documento
  expect(linkToFavPokemon).toBeInTheDocument(); // vendo se ta no documento
});
