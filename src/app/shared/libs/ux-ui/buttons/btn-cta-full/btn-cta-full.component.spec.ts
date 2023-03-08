import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCtaFullComponent } from './btn-cta-full.component';

describe('BtnCtaFullComponent', () => {
  let component: BtnCtaFullComponent;
  let fixture: ComponentFixture<BtnCtaFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnCtaFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnCtaFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
