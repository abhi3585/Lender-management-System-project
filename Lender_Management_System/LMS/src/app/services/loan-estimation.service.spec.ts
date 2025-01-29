import { TestBed } from '@angular/core/testing';

import { LoanEstimationService } from './loan-estimation.service';

describe('LoanEstimationService', () => {
  let service: LoanEstimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanEstimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
