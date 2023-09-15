import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCrossAddComponent } from './svg-cross-add.component';

describe('SvgCrossAddComponent', () => {
  let component: SvgCrossAddComponent;
  let fixture: ComponentFixture<SvgCrossAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgCrossAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgCrossAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
