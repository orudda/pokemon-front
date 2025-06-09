import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../core/favorite.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-favorite-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="toggle()" [class.favorited]="isFavorite$ | async">
      <ng-container *ngIf="(isFavorite$ | async); else notFav">★</ng-container>
      <ng-template #notFav>☆</ng-template>
    </button>
  `,
  styles: [`
    button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #f7b801;
      transition: transform 0.1s;
    }
    button.favorited {
      color: #f7b801;
      font-weight: bold;
      transform: scale(1.2);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteToggleComponent {
  @Input() name!: string;
  isFavorite$;

  constructor(private favoriteService: FavoriteService) {
    this.isFavorite$ = this.favoriteService.favorites$.pipe(
      map(favs => this.name ? favs.includes(this.name) : false)
    );
  }

  toggle() {
    if (this.name) {
      this.favoriteService.toggleFavorite(this.name);
    }
  }
} 