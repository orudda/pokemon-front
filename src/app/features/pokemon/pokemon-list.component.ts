import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PokemonService, PokemonListResponse } from '../../data/services/pokemon.service';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, startWith, switchMap, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FavoriteToggleComponent } from '../../shared/favorite-toggle.component';
import { FavoriteService } from '../../core/favorite.service';

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
  showFavoritesModal = false;
  favoritesWithSprites$: Observable<{ name: string; id: number; sprite: string }[]>;

  constructor(
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService
  ) {
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

    this.favoritesWithSprites$ = this.favoriteService.favorites$.pipe(
      switchMap(favs => {
        if (!favs.length) return of([]);
        return combineLatest(
          favs.map(name =>
            this.pokemonService.getPokemonByNameOrId(name).pipe(
              map(detail => ({
                name,
                id: detail?.id ?? 0,
                sprite: detail?.sprites.front_default ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
              }))
            )
          )
        );
      })
    );
  }

  ngOnInit(): void {}

  onPageChange(newPage: number) {
    this.page$.next(newPage);
  }

  getSpriteUrl(pokemon: { name: string; url: string }) {
    const match = pokemon.url.match(/\/pokemon\/(\d+)\/?$/);
    const id = match ? match[1] : null;
    if (id) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'; // fallback
  }

  onSpriteError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  }

  openFavoritesModal() {
    this.showFavoritesModal = true;
  }
  closeFavoritesModal() {
    this.showFavoritesModal = false;
  }
} 