import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { LoaderService } from './services/loader.service';
import { ToastService } from './services/toast.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['getUser', 'getRepositories']);
    const toastSpy = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        LoaderService,
        { provide: ApiService, useValue: apiSpy },
        { provide: ToastService, useValue: toastSpy }
      ]
    });

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data and repositories on getUserDetails', fakeAsync(() => {
    const mockUserData = { login: 'testuser', name: 'Test User' };
    const mockRepositoriesData = [{ name: 'repo1' }, { name: 'repo2' }];
    apiServiceSpy.getUser.and.returnValue(of(mockUserData));
    apiServiceSpy.getRepositories.and.returnValue(of(mockRepositoriesData));

    component.username = 'testuser';
    component.getUserDetails();
    tick();

    expect(component.user).toEqual(mockUserData);
    expect(component.repoList).toEqual(mockRepositoriesData);
    expect(toastServiceSpy.showSuccess).toHaveBeenCalledWith('User data fetched successfully');
    expect(toastServiceSpy.showError).not.toHaveBeenCalled();
  }));

  it('should show error message when getUserDetails fails', fakeAsync(() => {
    const errorMessage = 'Error fetching user data';
    apiServiceSpy.getUser.and.throwError(errorMessage);

    component.username = 'testuser';
    component.getUserDetails();
    tick();

    expect(component.user).toBeNull();
    expect(component.repoList).toEqual([]);
    expect(toastServiceSpy.showSuccess).not.toHaveBeenCalled();
    expect(toastServiceSpy.showError).toHaveBeenCalledWith(errorMessage);
  }));

  it('should update current page and fetch new repositories on onPageChange', () => {
    component.currentPage = 1;
    spyOn(component, 'getRepoList');

    component.onPageChange(2);

    expect(component.currentPage).toBe(2);
    expect(component.getRepoList).toHaveBeenCalled();
  });

  it('should update items per page and fetch new repositories on onItemsPerPageChange', () => {
    const mockEvent = { target: { value: '20' } } as unknown as Event; // Create a mock event object
    spyOn(component, 'getRepoList');

    component.onItemsPerPageChange(mockEvent);

    expect(component.itemsPerPage).toBe(20);
    expect(component.currentPage).toBe(1);
    expect(component.getRepoList).toHaveBeenCalled();
  });
});
