import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  viewPokemon: boolean = false;
  pokemonFilter: string = '';
  pokemons: Pokemon[] = [];
  pokemon!: Pokemon;
  action!: string;
  title!: string;

  constructor(private pokemonSrv: PokemonService) {
    this.getPokemons();
  }

  async getPokemons(){
    this.pokemons = await lastValueFrom(this.pokemonSrv.getPokemons());
  }

  createPokemon(){
    this.action = 'create';
    this.title = 'Nuevo Pokemon';
    this.pokemon = {id:0, name:'', image:'', attack:0, defense:0 };
    this.viewPokemon = true;
  }

  editPokemonEmit(pokemon: Pokemon){
    this.viewPokemon = true;
    this.pokemon = pokemon;
    this.action = 'edit';
    this.title = 'Editar Pokemon';
  }

  updatePokemonsEmit(){
    this.viewPokemon = false;
    this.getPokemons();
  }
}
