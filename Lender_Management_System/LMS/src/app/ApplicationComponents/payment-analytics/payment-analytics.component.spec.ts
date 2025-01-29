import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAnalyticsComponent } from './payment-analytics.component';

describe('PaymentAnalyticsComponent', () => {
  let component: PaymentAnalyticsComponent;
  let fixture: ComponentFixture<PaymentAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentAnalyticsComponent]
    });
    fixture = TestBed.createComponent(PaymentAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
