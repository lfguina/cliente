import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcListarArtistasComponent } from './hc-listar-artistas.component';

describe('HcListarArtistasComponent', () => {
  let component: HcListarArtistasComponent;
  let fixture: ComponentFixture<HcListarArtistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcListarArtistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcListarArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
