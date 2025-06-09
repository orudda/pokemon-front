import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PokemonService, PokemonListResponse } from '../../data/services/pokemon.service';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  data$;

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
        this.pokemonService.getPokemonList(page, this.pageSize, search || '');
        return this.pokemonService.data$;
      })
    );
  }

  ngOnInit(): void {}

  onPageChange(newPage: number) {
    this.page$.next(newPage);
  }
} 