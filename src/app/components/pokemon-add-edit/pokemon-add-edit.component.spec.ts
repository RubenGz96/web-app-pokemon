import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service';
import {  of} from 'rxjs';
import { PokemonAddEditComponent } from './pokemon-add-edit.component';

describe('PokemonAddEditComponent', () => {
  let component: PokemonAddEditComponent;
  let fixture: ComponentFixture<PokemonAddEditComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>

  beforeEach(async () => {
    pokemonServiceSpy = jasmine.createSpyObj<PokemonService>('PokemonService', ['createPokemon', 'updatePokemon']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ PokemonAddEditComponent ],
      providers: [ FormBuilder, {provide: PokemonService, useValue: pokemonServiceSpy} ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(PokemonAddEditComponent);
    component = fixture.componentInstance;

  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar formulario valido', () => {
    component.pokemon = {id:0, name:'', image:'', attack:0, defense:0 }
    component.ngOnChanges();
    component.form.controls['name'].setValue('Pikachu');
    component.form.controls['image'].setValue('https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png');

    expect(component.form.valid).toBeTrue();
  });

  it('Debe retornar formulario invalido', () => {
    component.pokemon = {id:0, name:'', image:'', attack:0, defense:0 }
    component.ngOnChanges();
    component.form.controls['name'].setValue('Pikachu');

    expect(component.form.invalid).toBeTrue();
  });

  it(`Debe retornar el valor de 'ataque=5' del pokemon, eventAttack(number)`, () => {
    component.eventAttack(5);
    expect(component.attack).toEqual(5);
  });

  it(`Debe retornar el valor de 'defensa= 10' del pokemon , (eventDefense(number))`, () => {
    component.eventDefense(10);
    expect(component.defense).toEqual(10);
  });


  it('Debe crear pokemon, action = create, save()', () => {
    component.respServ = {id:0, name:'', image:'', attack:0, defense:0 };
    component.pokemon = {id:0, name:'', image:'', attack:0, defense:0 }
    component.action = 'create';
    component.ngOnChanges();
    component.form.controls['name'].setValue('Pikachu');
    component.form.controls['image'].setValue('https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png');

    const mockPokemon = {
      id: 361,
      name: "Pickachu",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/026.png",
      attack: 40,
      hp: 35,
      defense: 20,
      type: "Normal",
      idAuthor: 3
    }

    pokemonServiceSpy.createPokemon.and.returnValue(of(mockPokemon))
    component.save();
    expect(component.respServ).toEqual(mockPokemon); 
  })

  it('Debe actualizar pokemon, action = update, save() ', () => {
    component.respServ = {id:0, name:'', image:'', attack:0, defense:0 };
    component.pokemon = {id:0, name:'', image:'', attack:0, defense:0 }
    component.action = 'update';
    component.ngOnChanges();
    component.form.controls['name'].setValue('Pikachu');
    component.form.controls['image'].setValue('https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png');

    const mockPokemon = {
      id: 361,
      name: "Wartortle",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
      attack: 31,
      hp: 156,
      defense: 34,
      type: "Normal",
      idAuthor: 3
    }

    pokemonServiceSpy.updatePokemon.and.returnValue(of(mockPokemon))
    component.save();
    expect(component.respServ).toEqual(mockPokemon); 
  })


});
