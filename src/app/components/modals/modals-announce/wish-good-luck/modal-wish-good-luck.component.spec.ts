import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWishGoodLuckComponent } from './modal-wish-good-luck.component';

describe('ModalWishGoodLuckComponent', () => {
  let component: ModalWishGoodLuckComponent;
  let fixture: ComponentFixture<ModalWishGoodLuckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWishGoodLuckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalWishGoodLuckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
