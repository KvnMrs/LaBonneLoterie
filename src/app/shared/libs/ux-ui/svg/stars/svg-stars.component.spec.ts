import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgStarsComponent } from './svg-stars.component';

describe('SvgStarsComponent', () => {
  let component: SvgStarsComponent;
  let fixture: ComponentFixture<SvgStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgStarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
