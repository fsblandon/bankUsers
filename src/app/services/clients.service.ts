import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private API_URL = 'https://testbankapi.firebaseio.com/';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client> {
    return this.http.get<Client>( this.API_URL + 'clients.json');
  }

  addClient(
    client: Client
  ): Observable<any> {
    return this.http.post<any>(this.API_URL + 'clients.json', client);
  }
}
