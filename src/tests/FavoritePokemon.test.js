import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const linkFavoriteText = { name: /favorite pokémon/i };

describe('Ao favoritar a partir da página de detalhes teste se', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon />);

    const whithoutFav = screen.getByText(/no favorite pokémon found/i);
    expect(whithoutFav).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemon/25');
    });

    const checkBox = screen.getByRole('checkbox');
    userEvent.click(checkBox);

    const linkFavorite = screen.getByRole('link', linkFavoriteText);
    userEvent.click(linkFavorite);

    const pokPikachu = screen.getByText('Pikachu');
    expect(pokPikachu).toBeInTheDocument();
  });
});
