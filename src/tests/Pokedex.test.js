import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

const pokemonTypes = [...new Set(
  pokemonList.reduce((types, { type }) => [...types, type], []),
)];

describe('Teste o componente <Pokedex.js />', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered Pokémon;', () => {
    renderWithRouter(<App />);

    const h2AnchorNode = screen.getByText(/encountered pokémon/i);
    expect(h2AnchorNode).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
    renderWithRouter(<App />);

    const buttonClickTest1 = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonClickTest1).toBeInTheDocument();

    pokemonList.forEach((pokemon) => {
      const pokeName = screen.getByText(pokemon.name);
      expect(pokeName).toBeVisible();
      userEvent.click(buttonClickTest1);
    });

    const pokeNameFirstI = screen.getByText(pokemonList[0].name);
    expect(pokeNameFirstI).toBeVisible();
  });

  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);

    const buttonClickTest2 = screen.getAllByTestId('pokemon-type-button');
    const buttonClickTest3 = screen.getByTestId('next-pokemon');
    pokemonTypes.forEach((type) => {
      const typeButton = buttonClickTest2.find((btn) => btn.innerHTML === type);
      const querryPokemonByType = pokemonList.filter((pok) => pok.type === type);
      userEvent.click(typeButton);
      querryPokemonByType.forEach((pokemon) => {
        const pokemonName = screen.getByText(pokemon.name);
        expect(pokemonName).toBeVisible();
        if (!buttonClickTest3.disabled) {
          userEvent.click(buttonClickTest3);
        }
      });
    });
    const allButton = screen.getByText(/all/i);
    userEvent.click(allButton);
    const firstPokemon = screen.getByText(pokemonList[0].name);
    expect(firstPokemon).toBeVisible();
  });
});
