import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerDashboardComponent } from './borrower-dashboard.component';

describe('BorrowerDashboardComponent', () => {
  let component: BorrowerDashboardComponent;
  let fixture: ComponentFixture<BorrowerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowerDashboardComponent]
    });
    fixture = TestBed.createComponent(BorrowerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
