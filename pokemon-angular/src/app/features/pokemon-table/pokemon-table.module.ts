import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./pokemon-table.component').then(m => m.PokemonTableComponent) }
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class PokemonTableModule {} 