import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { HomeDashboard } from '../../components/home-dashboard';
import { AuthService } from '../../../auth/service/auth.service';
import { CajeroService } from '../../service/cajero.service';
import { RetiroService } from '../../service/retiro.service';

import { LoginResponse } from '../../../auth/models/login.model';
import { CajeroResponse, InventarioCajeroResponse } from '../../models/cajero.model';
import { RetiroRequest } from '../../models/retiro.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeDashboard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  usuario: LoginResponse | null = null;
  cajero: CajeroResponse | null = null;
  inventario: InventarioCajeroResponse[] = [];

  loadingDashboard = false;
  loadingRetiro = false;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private cajeroService: CajeroService,
    private retiroService: RetiroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerSesion();

    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarDashboard();
  }

  cargarDashboard(): void {
    if (!this.usuario) return;

    this.loadingDashboard = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.cajeroService.obtenerDashboardCajero({
      idUsuario: this.usuario.idUsuario,
      numeroTarjeta: this.usuario.numeroTarjeta
    })
      .pipe(
        finalize(() => {
          this.loadingDashboard = false;
        })
      )
      .subscribe(
        {
          next: (result) => {
            console.log(result);
            if (!result.correct || !result.object) {
              this.errorMessage = result.errorMessage ?? 'No se pudo obtener la información del cajero.';
              return;
            }

            this.cajero = result.object.cajero;
            this.inventario = result.object.inventario ?? [];
          },
          error: (error) => {
            console.error(error);
            this.errorMessage = 'No se pudo conectar con el servidor.';
          }
        });
  }

  retirar(monto: number): void {
    if (!this.usuario || !this.cajero) return;

    this.loadingRetiro = true;
    this.errorMessage = null;
    this.successMessage = null;

    const request: RetiroRequest = {
      idUsuario: this.usuario.idUsuario,
      idTarjeta: this.usuario.idTarjeta,
      idCajero: this.cajero.idCajero,
      monto
    };

    this.retiroService.retirar(request)
      .pipe(
        finalize(() => {
          this.loadingRetiro = false;
        })
      )
      .subscribe({
        next: (result) => {
          if (!result.correct) {
            this.errorMessage = result.errorMessage ?? 'No se pudo realizar el retiro.';
            return;
          }

          this.successMessage = 'Retiro realizado correctamente.';

          this.cargarDashboard();
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'No se pudo conectar con el servidor para realizar el retiro.';
        }
      });
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}