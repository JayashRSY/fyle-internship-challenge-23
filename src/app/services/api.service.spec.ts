import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data from API', () => {
    const username = 'testuser';
    const mockUserData = { login: 'testuser', name: 'Test User' };

    service.getUser(username).subscribe(user => {
      expect(user).toEqual(mockUserData);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  it('should get repositories data from API', () => {
    const username = 'testuser';
    const page = 1;
    const perPage = 10;
    const mockRepositoriesData = [{ name: 'repo1' }, { name: 'repo2' }];

    service.getRepositories(username, page, perPage).subscribe(repos => {
      expect(repos).toEqual(mockRepositoriesData);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRepositoriesData);
  });
});
