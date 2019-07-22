import { TestBed, inject } from '@angular/core/testing';

import { ClientsService } from './clients.service';
import { HttpClientModule } from '@angular/common/http';

describe('ClientsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientsService
      ],
      imports: [
        HttpClientModule,
      ],
    });
  });

  it('should be created', () => {
    const service: ClientsService = TestBed.get(ClientsService);
    expect(service).toBeTruthy();
  });

  it('should be injected', () => {
    inject([ClientsService], (service: ClientsService) => {
      expect(service).toBeTruthy();
    });
  });
});
