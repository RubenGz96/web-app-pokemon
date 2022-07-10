import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom, of } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
import { RespDeletePokemon } from '../interfaces/resp-delete-pokemon';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpClientSpy: {post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy};

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PokemonService);
  });

  beforeEach(()=> {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put', 'delete']);
    service = new PokemonService(httpClientSpy as any)
  });


  it('Debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debe crear un pokemon, createPokemon(Pokemon) ', (done: DoneFn) => {
    const mockPokemonRequest: Pokemon = {
      attack: 31,
      defense: 34,
      hp: 156,
      idAuthor: 3,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
      name: "Wartortle",
      type: "Normal",
      id: 0
    }
    const mockPokemonResponse = {
        id: 361,
        name: "Wartortle",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
        attack: 31,
        defense: 34,
        hp: 156,
        type: "Normal",
        id_author: 3
    }

    httpClientSpy.post.and.returnValue(of(mockPokemonResponse));
    service.createPokemon(mockPokemonRequest)
      .subscribe(resultado => {
        expect(resultado).toEqual(mockPokemonResponse)
        done()
      });
  });

  it('Debe actualizar un pokemon, updatePokemon(Pokemon)', (done: DoneFn) => {
    const mockPokemonRequest: Pokemon = {
      attack: 31,
      defense: 34,
      hp: 156,
      idAuthor: 3,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
      name: "Wartortle",
      type: "Normal",
      id: 0
    }
    const mockPokemonResponse = {
        id: 361,
        name: "Wartortle",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
        attack: 31,
        defense: 34,
        hp: 156,
        type: "Normal",
        id_author: 3
    }

    httpClientSpy.put.and.returnValue(of(mockPokemonResponse));
    service.updatePokemon(mockPokemonRequest)
      .subscribe(resultado => {
        expect(resultado).toEqual(mockPokemonResponse)
        done()
      });
  });

  it('Debe eliminar un pokemon, deletePokemon(Pokemon) ', (done: DoneFn) => {
    const idPokemon = 0;
    const response: RespDeletePokemon = {
      success: true,
      type: 'pokemon_removed',
      data: []
  }
    httpClientSpy.delete.and.returnValue(of(response));
    service.deletePokemon(idPokemon)
      .subscribe(resultado => {
        expect(resultado).toEqual(response)
        done()
      });
  });
});
