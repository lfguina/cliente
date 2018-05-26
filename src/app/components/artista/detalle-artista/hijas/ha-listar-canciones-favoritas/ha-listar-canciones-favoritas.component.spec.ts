import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaListarCancionesFavoritasComponent } from './ha-listar-canciones-favoritas.component';

describe('HaListarCancionesFavoritasComponent', () => {
  let component: HaListarCancionesFavoritasComponent;
  let fixture: ComponentFixture<HaListarCancionesFavoritasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaListarCancionesFavoritasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaListarCancionesFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
