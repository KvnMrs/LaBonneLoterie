import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgShutdownComponent } from './svg-shutdown.component';

describe('SvgShutdownComponent', () => {
  let component: SvgShutdownComponent;
  let fixture: ComponentFixture<SvgShutdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgShutdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgShutdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
