import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const FAVORITES_KEY = 'pokemon_favorites';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private favoritesSubject = new BehaviorSubject<string[]>(this.getFavoritesFromStorage());
  favorites$: Observable<string[]> = this.favoritesSubject.asObservable();

  private getFavoritesFromStorage(): string[] {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  }

  private updateStorage(favorites: string[]) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  isFavorite(name: string): boolean {
    return this.favoritesSubject.value.includes(name);
  }

  toggleFavorite(name: string) {
    const current = this.favoritesSubject.value;
    if (current.includes(name)) {
      this.updateStorage(current.filter(fav => fav !== name));
    } else {
      this.updateStorage([...current, name]);
    }
  }
} 