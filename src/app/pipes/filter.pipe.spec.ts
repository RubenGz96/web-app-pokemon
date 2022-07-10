import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('Debe crear la Instancia', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it(`Debe retornar el pokemon buscado, 'Wartortle'`, () => {
    const pipe = new FilterPipe();
    const pokemons = [
      {
          id: 294,
          name: "Bulbasaurd",
          image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
          attack: 26,
          defense: 40,
          hp: 156,
          type: "Normal",
          id_author: 3
      },
      {
          id: 361,
          name: "Wartortle",
          image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
          attack: 31,
          defense: 34,
          hp: 156,
          type: "Normal",
          id_author: 3
      }]
    const pokemonResult = [
      {
        id: 361,
        name: "Wartortle",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
        attack: 31,
        defense: 34,
        hp: 156,
        type: "Normal",
        id_author: 3
      }];

    const result = pipe.transform(pokemons, 'war')
    expect(result).toEqual(pokemonResult);
  });

  it('Debe retornar un arreglo vacio de pokemons, []', () => {
    const pipe = new FilterPipe();
    const pokemons = [
      {
          id: 294,
          name: "Bulbasaurd",
          image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
          attack: 26,
          defense: 40,
          hp: 156,
          type: "Normal",
          id_author: 3
      },
      {
          id: 361,
          name: "Wartortle",
          image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
          attack: 31,
          defense: 34,
          hp: 156,
          type: "Normal",
          id_author: 3
      }]

    const result = pipe.transform(pokemons, 'zzz')
    expect(result).toEqual([]);
  });

});
