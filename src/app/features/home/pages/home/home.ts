import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { HomeDashboard } from '../../components/home-dashboard';
import { AuthService } from '../../../auth/service/auth.service';
import { CajeroService } from '../../service/cajero.service';
import { RetiroService } from '../../service/retiro.service';

import { LoginResponse } from '../../../auth/models/login.model';
import { CajeroResponse, InventarioCajeroResponse } from '../../models/cajero.model';
import { RetiroRequest } from '../../models/retiro.model';
import { MovimientoResponse } from '../../models/movimiento.model';

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

  movimientos: MovimientoResponse[] = [];
  cargandoMovimientos = true;
  mensajeError = '';

  constructor(
    private readonly authService: AuthService,
    private readonly cajeroService: CajeroService,
    private readonly retiroService: RetiroService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerSesion();

    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarDashboard();
    this.cargarMovimientos();
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
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (result) => {
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
      numeroTarjeta: this.usuario.numeroTarjeta,
      idCajero: this.cajero.idCajero,
      monto
    };

    this.retiroService.retirar(request)
      .pipe(
        finalize(() => {
          this.loadingRetiro = false;
          this.cdr.detectChanges();
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
          this.cargarMovimientos();
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'No se pudo conectar con el servidor para realizar el retiro.';
        }
      });
  }

  cargarMovimientos(): void {
    const publicId = this.usuario?.public_id || '';

    this.cargandoMovimientos = true;
    this.mensajeError = '';

    if (!publicId) {
      this.movimientos = [];
      this.mensajeError = 'No se encontró el publicId del usuario en la sesión.';
      this.cargandoMovimientos = false;
      return;
    }

    this.retiroService.obtenerMovimientos(publicId).subscribe({
      next: (res) => {
        if (res.correct && res.objects) {
          this.movimientos = res.objects;
        } else {
          this.movimientos = [];
          this.mensajeError = 'Aún no tienes movimientos registrados.';
        }

        this.cargandoMovimientos = false;
      },
      error: (err) => {
        console.error(err);
        this.movimientos = [];
        this.mensajeError = 'No se pudo cargar el historial de movimientos.';
        this.cargandoMovimientos = false;
      }
    });
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}