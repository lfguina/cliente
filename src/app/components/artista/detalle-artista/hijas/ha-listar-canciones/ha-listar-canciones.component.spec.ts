import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaListarCancionesComponent } from './ha-listar-canciones.component';

describe('HaListarCancionesComponent', () => {
  let component: HaListarCancionesComponent;
  let fixture: ComponentFixture<HaListarCancionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaListarCancionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaListarCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
