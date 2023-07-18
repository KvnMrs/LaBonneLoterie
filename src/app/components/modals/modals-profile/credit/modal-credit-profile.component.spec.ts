import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreditProfileComponent } from './modal-credit-profile.component';

describe('ModalCreditProfileComponent', () => {
  let component: ModalCreditProfileComponent;
  let fixture: ComponentFixture<ModalCreditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreditProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
