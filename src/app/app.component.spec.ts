import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: HttpClient, useValue: httpClient, useClass: HttpClient },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('getPokemonData', () => {
    it('should show placeholder when pokemon name unavailable', async () => {
      // arrange
      const mockData = {
        id: 1,
        pokemon_name: 'bulbasaur',
        pokemon_nickname: 'Leafal Weapon'
      };
      component.getData = jasmine
        .createSpy()
        .and.returnValue(of({ mockData }));

      // act
      component.getData();

      // assert
      const pokemonName = component.getPokemonName(component.data);
      expect(pokemonName).toEqual('UNAVAILABLE');
    });
  });
});
