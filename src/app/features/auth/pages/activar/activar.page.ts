import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activar.page.html',
  styleUrls: ['./activar.page.css']
})
export class ActivarCuenta implements OnInit {

  estado: 'cargando' | 'exito' | 'error' = 'cargando';
  mensaje: string = 'Verificando tu cuenta, por favor espera...';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.estado = 'error';
      this.mensaje = 'No se proporcionó un token de verificación válido.';
      return;
    }

    this.activar(token);
  }

  activar(token: string): void {
    this.usuarioService.activarCuenta(token)
      .pipe(finalize(() => { }))
      .subscribe({
        next: (res) => {
          if (res.correct) {
            this.estado = 'exito';
            this.mensaje = '¡Tu cuenta ha sido activada con éxito! Revisa tu bandeja de entrada, te hemos enviado tu número de tarjeta y los datos para iniciar sesión.';
          } else {
            this.estado = 'error';
            this.mensaje = res.errorMessage || 'Ocurrió un error al verificar la cuenta.';
          }
        },
        error: (err) => {
          this.estado = 'error';
          this.mensaje = err.error?.errorMessage || 'El enlace es inválido, ya fue usado o ha expirado. Solicita uno nuevo desde la pantalla de activación.';
        }
      });
  }

  irALogin(): void {
    this.router.navigate(['/login']);
  }
}