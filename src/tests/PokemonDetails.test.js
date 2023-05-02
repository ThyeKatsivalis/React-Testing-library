import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const moreDetailsLinkText = { name: /more details/i };
const pikachuDetailsText = { name: /pikachu details/i };
const summaryRoleName = { name: /summary/i };
const summaryTextaoDoZap = /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i;
const pikachuLocationRoleName = { name: /game locations of pikachu/i };
const pikachuLocationRoleName2 = /pikachu location/i;
const pokemonFavoritadoText = /pokémon favoritado\?/i;
const pokemonFavoritadoRole = { name: /pokémon favoritado\?/i };

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', moreDetailsLinkText));

    const pokemonDetail = screen.getByRole('heading', pikachuDetailsText);
    const pokemonSummary = screen.getByRole('heading', summaryRoleName);
    const pokemonSummaryText = screen.getByText(summaryTextaoDoZap);

    expect(pokemonDetail).toBeInTheDocument();
    expect(pokemonSummary).toBeInTheDocument();
    expect(pokemonSummaryText).toBeInTheDocument();
  });

  test('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', moreDetailsLinkText));

    const pokemonLocal = screen.getByRole('heading', pikachuLocationRoleName);
    const pokemonSrc1 = screen.getAllByAltText(pikachuLocationRoleName2);
    const pokemonSrc2 = screen.getAllByAltText(pikachuLocationRoleName2);

    expect(pokemonLocal).toBeInTheDocument();
    expect(pokemonSrc1[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonSrc1[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pokemonSrc2[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(pokemonSrc2[1]).toHaveAttribute('alt', 'Pikachu location');
  });

  test('Testa se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', moreDetailsLinkText));

    const pokemonLabelTxt = screen.getByText(pokemonFavoritadoText);
    const pokemonCheckBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });

    expect(pokemonLabelTxt).toBeInTheDocument();
    expect(pokemonCheckBox).toBeInTheDocument();

    userEvent.click(screen.getByRole('checkbox', pokemonFavoritadoRole));
    expect(pokemonCheckBox.checked).toBeTruthy();

    userEvent.click(screen.getByRole('checkbox', pokemonFavoritadoRole));
    expect(pokemonCheckBox.checked).toBeFalsy();
  });
});
