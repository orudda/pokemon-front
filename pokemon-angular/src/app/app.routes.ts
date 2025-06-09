import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  {
    path: 'pokemons',
    loadChildren: () => import('./features/pokemon-table/pokemon-table.module').then(m => m.PokemonTableModule)
  }
];
