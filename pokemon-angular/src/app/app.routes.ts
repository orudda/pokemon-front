import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  {
    path: 'pokemons',
    loadComponent: () => import('./features/pokemon/pokemon-list.component').then(m => m.PokemonListComponent)
  },
  { path: '**', redirectTo: 'pokemons' }
];
