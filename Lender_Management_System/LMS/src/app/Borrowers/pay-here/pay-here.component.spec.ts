import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayHereComponent } from './pay-here.component';

describe('PayHereComponent', () => {
  let component: PayHereComponent;
  let fixture: ComponentFixture<PayHereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayHereComponent]
    });
    fixture = TestBed.createComponent(PayHereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
