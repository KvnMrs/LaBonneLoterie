import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeClosedComponent } from './eye-closed.component';

describe('EyeClosedComponent', () => {
  let component: EyeClosedComponent;
  let fixture: ComponentFixture<EyeClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EyeClosedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EyeClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
