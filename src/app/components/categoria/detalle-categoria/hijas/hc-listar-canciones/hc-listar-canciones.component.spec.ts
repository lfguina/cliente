import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcListarCancionesComponent } from './hc-listar-canciones.component';

describe('HcListarCancionesComponent', () => {
  let component: HcListarCancionesComponent;
  let fixture: ComponentFixture<HcListarCancionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcListarCancionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcListarCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
