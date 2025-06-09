import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonTableModule } from './features/pokemon-table/pokemon-table.module';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonTableModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokemon-angular';
}
