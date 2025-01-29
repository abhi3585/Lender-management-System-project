import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCreationComponent } from './loan-creation.component';

describe('LoanCreationComponent', () => {
  let component: LoanCreationComponent;
  let fixture: ComponentFixture<LoanCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanCreationComponent]
    });
    fixture = TestBed.createComponent(LoanCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
