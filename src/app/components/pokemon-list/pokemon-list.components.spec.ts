import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';
import { PokemonListComponent } from './pokemon-list.component';
import { RespDeletePokemon } from 'src/app/interfaces/resp-delete-pokemon';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>

  beforeEach(async () => {
    pokemonServiceSpy = jasmine.createSpyObj<PokemonService>('PokemonService', ['deletePokemon']);
    await TestBed.configureTestingModule({
      declarations: [ PokemonListComponent, FilterPipe ],
      providers: [  {provide: PokemonService, useValue: pokemonServiceSpy} ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;

  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

 
  it('Debe eliminar pokemon, deletePokemon(number)', () => {
    const idPokemon:number = 1;

    const response: RespDeletePokemon = {
        success: true,
        type: 'pokemon_removed',
        data: []
    }

    pokemonServiceSpy.deletePokemon.and.returnValue(of(response))
    component.deletePokemon(idPokemon);
    expect(component.respServ).toEqual(response); 
  })

  it(`Debe emitir el pokemon a editar , editPokemon(Pokemon)`, () => {

    const pokemon = {
        id: 361,
        name: "Pickachu",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/026.png",
        attack: 40,
        hp: 35,
        defense: 20,
        type: "Normal",
        idAuthor: 3
      }

    component.editPokemon(pokemon);
    expect(component.pokemon).toEqual(pokemon);
  });


});
