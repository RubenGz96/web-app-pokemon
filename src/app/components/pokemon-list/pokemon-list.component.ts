import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { RespDeletePokemon } from 'src/app/interfaces/resp-delete-pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent{

  @Output()
  editPokemonEmit = new EventEmitter<Pokemon>();
  @Output()
  updatePokemonsEmit = new EventEmitter<null>();
  @Input()
  pokemons!: Pokemon[];
  @Input()
  pokemonFilter!: string;
  pokemon!: Pokemon;
  respServ!: RespDeletePokemon;

  constructor(private pokemonSrv: PokemonService) {}

  async deletePokemon(idPokemon: number) {
    this.pokemonSrv.deletePokemon(idPokemon)
          .subscribe(resp=>{ this.respServ = resp; this.updatePokemonsEmit.emit() });
  }

  editPokemon(pokemon: Pokemon) {
    this.pokemon = pokemon;
    this.editPokemonEmit.emit(pokemon);
  }

}
