import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RetiroRequest, RetiroResponse } from '../models/retiro.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class RetiroService {

  private readonly apiRetiro = 'http://localhost:8080/api/retiro';

  constructor(private http: HttpClient) {}

  retirar(request: RetiroRequest): Observable<Result<RetiroResponse>> {
    return this.http.post<Result<RetiroResponse>>(
      this.apiRetiro,
      request
    );
  }

}