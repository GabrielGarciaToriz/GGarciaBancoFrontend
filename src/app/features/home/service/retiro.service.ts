import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RetiroRequest, RetiroResponse } from '../models/retiro.model';
import { Result } from '../models/result.model';
import { MovimientoResponse } from '../models/movimiento.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetiroService {

  private readonly apiRetiro = environment.apiUrl + '/retiro';

  constructor(private http: HttpClient) { }

  retirar(request: RetiroRequest): Observable<Result<RetiroResponse>> {
    return this.http.post<Result<RetiroResponse>>(
      this.apiRetiro,
      request
    );
  }
  obtenerMovimientos(publicId: string): Observable<Result<MovimientoResponse>> {
    return this.http.get<Result<MovimientoResponse>>(`${this.apiRetiro}/historial/${publicId}`);
  }

}