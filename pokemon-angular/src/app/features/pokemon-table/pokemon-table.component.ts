import { Component, OnInit } from '@angular/core';
import { PokemonService, PokemonListResponse } from '../../data/services/pokemon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit {
  loading$;
  data$;
  error$;

  page = 1;
  pageSize = 20;
  search = '';

  constructor(private pokemonService: PokemonService) {
    this.loading$ = this.pokemonService.loading$;
    this.data$ = this.pokemonService.data$;
    this.error$ = this.pokemonService.error$;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.pokemonService.getPokemonList(this.page, this.pageSize, this.search);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.fetchData();
  }

  onSearchChange(newSearch: string) {
    this.search = newSearch;
    this.page = 1;
    this.fetchData();
  }
} 