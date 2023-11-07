import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.github.com/users/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`${this.apiUrl}${githubUsername}`);
  }
  getRepositories(username: string, page: number, perPage: number) {
    const url = `${this.apiUrl}${username}/repos?page=${page}&per_page=${perPage}`;
    return this.httpClient.get(url);
  }
}
