import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuyTickectComponent } from './modal-buy-ticket.component';

describe('ModalBuyTickectComponent', () => {
  let component: ModalBuyTickectComponent;
  let fixture: ComponentFixture<ModalBuyTickectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalBuyTickectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBuyTickectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
