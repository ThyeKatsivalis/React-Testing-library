import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const startedPokemon = /pikachu/i;
const startedPokWeight = /average weight: 6\.0 kg/i;
const startedPokImg = { name: /pikachu sprite/i };
const moreDetailsPoke = { name: /more details/i };
const checkboxFavoritePok = { name: /pokémon favoritado\?/i };
const PokMarkedAsFavorite = { name: /pikachu is marked as favorite/i };

describe('Testa o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(startedPokemon);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(startedPokWeight);
    const pokemonImg = screen.getByRole('img', startedPokImg);

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Testa se aparece o icone de estrela nos pokemons favoritados.', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', moreDetailsPoke));
    userEvent.click(screen.getByRole('checkbox', checkboxFavoritePok));
    const pokemonFavoritado = screen.getByRole('img', PokMarkedAsFavorite);

    expect(pokemonFavoritado).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonFavoritado).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
