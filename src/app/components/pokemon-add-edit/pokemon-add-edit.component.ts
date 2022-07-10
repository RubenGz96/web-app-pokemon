import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemon-add-edit',
  templateUrl: './pokemon-add-edit.component.html',
  styleUrls: ['./pokemon-add-edit.component.css']
})
export class PokemonAddEditComponent {

  @Output()
  updatePokemonsEmit = new EventEmitter<null>();
  @Input()
  pokemon!: Pokemon;
  @Input()
  action!: string;
  @Input()
  title!: string;
  validate!: number;
  attack!: number;
  defense!: number;
  form!: FormGroup;
  respServ!: Pokemon;
  hp: number = environment.hp;
  type: string = environment.type;
  idAuthor: number = environment.idAuthor;

  constructor(private fb: FormBuilder, private pokemonSrv: PokemonService) {}

  ngOnChanges(): void{
    this.attack = this.pokemon.attack;
    this.defense = this.pokemon.defense;
    this.validate = 0;
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: [this.pokemon.name, Validators.required],
      image: [this.pokemon.image, Validators.required],
      attack: [this.pokemon.attack, [Validators.required, Validators.min(1)]],
      defense: [this.pokemon.defense, [Validators.required, Validators.min(1)]]
   });
  }

  save() {
    if (this.validate > 0) return;
    this.validate ++;
    this.pokemon = {
      ... this.form.value,
      id: this.pokemon.id,
      hp: this.hp,
      type: this.type,
      idAuthor: this.idAuthor
    };

    if (this.action == 'create')
      this.pokemonSrv.createPokemon(this.pokemon)
          .subscribe(resp=>{ this.respServ = resp; this.updatePokemonsEmit.emit() });
    else 
      this.pokemonSrv.updatePokemon(this.pokemon)
          .subscribe(resp=>{ this.respServ = resp; this.updatePokemonsEmit.emit() });
  }

  eventAttack(event:any){ 
    this.attack = event;
  }

  eventDefense(event:any){ 
    this.defense = event;
  }
}
