import { TestBed } from '@angular/core/testing';

import { FtpElementService } from './ftp-element.service';

describe('FtpElementService', () => {
  let service: FtpElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtpElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
