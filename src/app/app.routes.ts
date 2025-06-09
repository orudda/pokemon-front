import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/pokemon/pokemon-list.component').then(m => m.PokemonListComponent)
  },
  { path: '**', redirectTo: '' }
];
