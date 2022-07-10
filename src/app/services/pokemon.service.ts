import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../interfaces/pokemon';
import { RespDeletePokemon } from '../interfaces/resp-delete-pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  endpoint: string = environment.endPoint;
  idAuthor: number = environment.idAuthor;

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]>{
    let params = new HttpParams();
    params = params.set('idAuthor', this.idAuthor);
    return this.http.get<Pokemon[]>(this.endpoint, { params });
  }

  createPokemon(pokemon: Pokemon): Observable<Pokemon>{
    return this.http.post<Pokemon>(this.endpoint, pokemon);
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon>{
    return this.http.put<Pokemon>(this.endpoint+pokemon.id, pokemon);
  }

  deletePokemon(idPokemon: number): Observable<RespDeletePokemon>{
    return this.http.delete<RespDeletePokemon>(this.endpoint+idPokemon);
  }
}
