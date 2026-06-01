import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment  } from '../../../../environments/environment';


import {
  CajeroConsultaRequest,
  CajeroResponse,
  DashboardCajeroResponse,
  InventarioCajeroResponse
} from '../models/cajero.model';

import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class CajeroService {

  private readonly apiCajero = environment.apiUrl + '/cajero';

  constructor(private http: HttpClient) { }

  obtenerDashboardCajero(request: CajeroConsultaRequest): Observable<Result<DashboardCajeroResponse>> {
    return this.http.post<Result<DashboardCajeroResponse>>(`${this.apiCajero}/dashboard`, request);
  }
}