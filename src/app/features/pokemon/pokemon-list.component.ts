import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PokemonService, PokemonListResponse } from '../../data/services/pokemon.service';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, startWith, switchMap, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FavoriteToggleComponent } from '../../shared/favorite-toggle.component';

type PokemonListOrDetail = PokemonListResponse & { detail?: import('../../data/services/pokemon.service').PokemonDetail };

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FavoriteToggleComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent implements OnInit {
  searchControl = new FormControl('');
  page$ = new BehaviorSubject<number>(1);
  pageSize = 20;

  loading$;
  error$;

  data$: Observable<PokemonListOrDetail>;

  constructor(private pokemonService: PokemonService) {
    this.loading$ = this.pokemonService.loading$;
    this.error$ = this.pokemonService.error$;

    this.data$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged()
      ),
      this.page$
    ]).pipe(
      switchMap(([search, page]) => {
        const searchTerm = (search || '').trim();
        if (searchTerm) {
          this.pokemonService.loadingSubject.next(true);
          this.pokemonService.errorSubject.next(null);
          return this.pokemonService.getPokemonByNameOrId(searchTerm).pipe(
            map(result => {
              this.pokemonService.loadingSubject.next(false);
              if (result) {
                return {
                  count: 1,
                  next: null,
                  previous: null,
                  results: [{ name: result.name, url: '' }],
                  detail: result
                };
              } else {
                this.pokemonService.errorSubject.next('Pokémon não encontrado');
                return { count: 0, next: null, previous: null, results: [] };
              }
            })
          );
        } else {
          this.pokemonService.getPokemonList(page, this.pageSize);
          return this.pokemonService.data$;
        }
      })
    );
  }

  ngOnInit(): void {}

  onPageChange(newPage: number) {
    this.page$.next(newPage);
  }
} 