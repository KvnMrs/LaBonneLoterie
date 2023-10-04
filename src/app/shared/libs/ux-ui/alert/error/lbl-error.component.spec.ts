import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LblErrorComponent } from './lbl-error.component';

describe('LblErrorComponent', () => {
  let component: LblErrorComponent;
  let fixture: ComponentFixture<LblErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LblErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LblErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
