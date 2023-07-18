import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateProfileComponent } from './modal-update-profile.component';

describe('ModalUpdateProfileComponent', () => {
  let component: ModalUpdateProfileComponent;
  let fixture: ComponentFixture<ModalUpdateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUpdateProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
