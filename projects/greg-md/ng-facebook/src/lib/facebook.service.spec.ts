import { TestBed, inject } from '@angular/core/testing';

import { FacebookService } from './facebook.service';

describe('FacebookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookService]
    });
  });

  it('should be created', inject([FacebookService], (service: FacebookService) => {
    expect(service).toBeTruthy();
  }));
});
