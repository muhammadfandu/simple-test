import { Component } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-test';

  name = 'Angular';
  data: any = {};
  isLoading = false;

  constructor(public httpSvc: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    const getData = this.httpSvc.get('https://pokeapi.co/api/v2/pokemon/1/');
    getData?.subscribe({
      next: (res: any) => {
        this.data = res;
        this.isLoading = false;
      },
      error: (e: HttpErrorResponse) => {
        this.isLoading = false;
        console.error(e);
      },
    });
  }

  getPokemonName(pokemon: any) {
    const name = pokemon.name || 'unavailable';
    return name.toUpperCase();
  }
}
