import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanConfigureComponent } from './loan-configure.component';

describe('LoanConfigureComponent', () => {
  let component: LoanConfigureComponent;
  let fixture: ComponentFixture<LoanConfigureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanConfigureComponent]
    });
    fixture = TestBed.createComponent(LoanConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
