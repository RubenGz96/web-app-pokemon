import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';

@Pipe({
  name: 'pokemonesFilter'
})
export class FilterPipe implements PipeTransform {

  transform(pokemons: Pokemon[], pokemonFilter: string): any {
    const result = [];
    for(const pokemon of pokemons){
        if (pokemon.name.toLowerCase().indexOf(pokemonFilter.toLowerCase()) > -1 ) {
          result.push(pokemon);
        };
    };
    return result;
  }

}
