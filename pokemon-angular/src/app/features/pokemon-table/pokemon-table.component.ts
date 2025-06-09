import { Component } from '@angular/core';
import { PokemonListComponent } from '../pokemon/pokemon-list.component';

@Component({
  selector: 'app-pokemon-table',
  template: '<app-pokemon-list></app-pokemon-list>',
  styleUrls: ['./pokemon-table.component.scss'],
  standalone: true,
  imports: [PokemonListComponent]
})
export class PokemonTableComponent {} 