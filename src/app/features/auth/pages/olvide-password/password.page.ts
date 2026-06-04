import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitarResetComponent } from '../../components/password-reset/solicitar-reset/solicitar-reset';
import { PasswordResetService } from '../../service/password.reset.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-olvide-password-page',
  standalone: true,
  imports: [CommonModule, SolicitarResetComponent],
  templateUrl: './password.page.html',
  styleUrl: './password.page.css'
})
export class OlvidePasswordPage {

  private readonly passwordResetService = inject(PasswordResetService);

  loading = false;
  mensajeExito = '';
  mensajeError = '';

  /*  onSubmit(correo: string): void {
      this.loading = true;
      this.mensajeExito = '';
      this.mensajeError = '';
  
      this.passwordResetService.solicitar(correo)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (res) => {
            this.mensajeExito = res.mensaje;
          },
          error: (err) => {
            this.mensajeError = err.error?.mensaje || 'Ocurrió un error. Inténtalo de nuevo.';
          }
        });
    }*/
}