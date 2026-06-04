import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { Register } from '../../components/register/register';
import { RegisterRequest } from '../../models/register.model';
import { BancoResponse } from '../../models/banco.model';

import { UsuarioService } from '../../service/usuario.service';
import { BancoService } from '../../service/banco.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, Register],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css'
})
export class RegisterPage implements OnInit {

  loading: boolean = false;
  loadingBancos: boolean = false;

  errorMessage: string | null = null;
  bancos: BancoResponse[] = [];
  private readonly usuarioService = inject(UsuarioService);

  constructor(
    private readonly bancoService: BancoService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.cargarBancos();
  }

  cargarBancos(): void {
    this.loadingBancos = true;
    this.errorMessage = null;

    this.bancoService.obtenerBancos()
      .pipe()
      .subscribe({
        next: (result) => {
          if (!result.correct) {
            this.errorMessage = result.errorMessage ?? 'No se pudieron cargar los bancos.';
            return;
          }
          this.bancos = result.objects ?? [];
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'No se pudo conectar con el servidor para cargar los bancos.';
        }
      });
  }

  onRegister(request: RegisterRequest): void {
    this.loading = true;
    this.errorMessage = null;

    this.usuarioService.registrarUsuario(request)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (result) => {
          if (!result.correct) {
            this.errorMessage = result.errorMessage ?? 'No se pudo registrar el usuario.';
            return;
          }

          alert('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'No se pudo conectar con el servidor.';
        }
      });
  }
  irALogin(): void {
    this.router.navigate(['/login']);
  }

}