import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTableModule } from './pokemon-table/pokemon-table.module';

@NgModule({
  imports: [CommonModule, PokemonTableModule],
  exports: [PokemonTableModule],
})
export class FeaturesModule {}
