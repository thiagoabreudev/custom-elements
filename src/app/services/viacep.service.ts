import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  private viacepUrl = 'https://viacep.com.br/ws/';
  constructor(private http: HttpClient) { }

  getAddress(cep) {
    return this.http.get(`${this.viacepUrl}/${cep}/json`);
  }
}
