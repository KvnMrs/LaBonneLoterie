import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAddToFavoritesComponent } from './svg-add-to-favorites.component';

describe('SvgAddToFavoritesComponent', () => {
  let component: SvgAddToFavoritesComponent;
  let fixture: ComponentFixture<SvgAddToFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgAddToFavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgAddToFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
