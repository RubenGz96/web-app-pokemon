import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ HttpClientModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('Debe existir la Instancia', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar los datos del pokemon en vacio', () => {
    const pokemon = {id:0, name:'', image:'', attack:0, defense:0 };
    component.createPokemon();
    expect(component.pokemon).toEqual(pokemon);
  });

  it('Debe cargar los datos del pokemon, editPokemonEmit(pokemon: Pokemon)', () => {
    const pokemon = {id: 1, name:'Pikachu', image:'url', attack:50, defense:50 };
    component.editPokemonEmit(pokemon);
    expect(component.pokemon.name).toEqual('Pikachu');
  });

  it('Debe actualizar la vista de pokemons, updatePokemonsEmit()', () => {
    component.updatePokemonsEmit();
    expect(component.viewPokemon).toBe(false);
  });

});
