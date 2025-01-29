import { TestBed } from '@angular/core/testing';

import { DeleteStatusService } from './delete-status.service';

describe('DeleteStatusService', () => {
  let service: DeleteStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
