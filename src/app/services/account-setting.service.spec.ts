import { TestBed } from '@angular/core/testing';

import { AccoutSettingService } from './account-setting.service';

describe('AccoutSettingService', () => {
  let service: AccoutSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccoutSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
