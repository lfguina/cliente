import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaListarAlbumesComponent } from './ha-listar-albumes.component';

describe('HaListarAlbumesComponent', () => {
  let component: HaListarAlbumesComponent;
  let fixture: ComponentFixture<HaListarAlbumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaListarAlbumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaListarAlbumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
