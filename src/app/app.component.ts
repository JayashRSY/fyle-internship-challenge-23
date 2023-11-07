import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { LoaderService } from './services/loader.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username: string = '';
  user: any = null
  repoList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxItemsPerPage: number = 100;

  /**
   * The constructor function initializes private and public variables for the ApiService,
   * LoaderService, and ToastService.
   * @param {ApiService} _apiService - The `_apiService` parameter is an instance of the `ApiService`
   * class. It is used to make API calls and handle the response.
   * @param {LoaderService} _loaderService - The `_loaderService` parameter is an instance of the
   * `LoaderService` class. It is used to show and hide loading indicators or spinners in the user
   * interface to indicate that a process is in progress.
   * @param {ToastService} _toastService - The `_toastService` parameter is an instance of the
   * `ToastService` class. It is used to display toast messages or notifications to the user.
   */
  constructor(
    private _apiService: ApiService,
    public _loaderService: LoaderService,
    private _toastService: ToastService
  ) { }

 /**
  * The function `getUserDetails` fetches user data from an API based on a given username and displays
  * success or error messages accordingly.
  */
  getUserDetails(): void {
    this.user = null;
    this.repoList = [];
    this._apiService.getUser(this.username).subscribe((res: any) => {
      if (res) {
        this._toastService.showSuccess("User data fetched successfully");
        this.user = res
        this.getRepoList()
      } else {
        this._toastService.showError("No user with that username found");
      }
    }, (err: any) => {
      this._toastService.showError(err.error.message);
    });
  }

 /**
  * The function `getRepoList` makes an API call to fetch repositories based on the provided username,
  * current page, and items per page, and updates the `repoList` variable with the fetched
  * repositories.
  */
  getRepoList(): void {
    this._apiService.getRepositories(this.username, this.currentPage, this.itemsPerPage)
      .subscribe((repositories: any) => {
        if (repositories) {
          this._toastService.showSuccess("Repository fetched successfully");
          this.repoList = repositories;
        } else {
          this._toastService.showError("No repository found");
        }
      }, (err: any) => {
        this._toastService.showError(err.error.message);
      });
  }
 /**
  * The onPageChange function updates the current page number and retrieves a list of repositories.
  * @param {number} pageNumber - The pageNumber parameter is a number that represents the page number
  * that the user wants to navigate to.
  */
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getRepoList();
  }

  /**
   * The function updates the number of items per page, resets the current page to 1, and retrieves a
   * new list of repositories.
   * @param {Event} event - The event parameter is of type Event, which represents an event that has
   * occurred in the browser. It can be any type of event, such as a click, keypress, or change event.
   */
  onItemsPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.itemsPerPage = parseInt(target.value, 10);
      this.currentPage = 1;
      this.getRepoList();
    }
  }
}
