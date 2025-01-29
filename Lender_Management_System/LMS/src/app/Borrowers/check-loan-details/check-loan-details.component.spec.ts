import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLoanDetailsComponent } from './check-loan-details.component';

describe('CheckLoanDetailsComponent', () => {
  let component: CheckLoanDetailsComponent;
  let fixture: ComponentFixture<CheckLoanDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckLoanDetailsComponent]
    });
    fixture = TestBed.createComponent(CheckLoanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
