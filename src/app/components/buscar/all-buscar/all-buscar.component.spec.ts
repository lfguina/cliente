import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBuscarComponent } from './all-buscar.component';

describe('AllBuscarComponent', () => {
  let component: AllBuscarComponent;
  let fixture: ComponentFixture<AllBuscarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBuscarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
