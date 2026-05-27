import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Login } from '../../components/login/login';
import { LoginRequest } from '../../models/login.model';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [CommonModule, Login],
    templateUrl: './login.page.html',
    styleUrl: './login.page.css'
})
export class LoginPage {

    loading: boolean = false;
    errorMessage: string | null = null;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onLogin(request: LoginRequest): void {
        this.loading = true;
        this.errorMessage = null;

        this.authService.login(request)
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                next: (result) => {
                    console.log(result);
                    if (!result.correct || !result.object) {
                        this.errorMessage = result.errorMessage ?? 'Usuario o contraseña incorrectos.';
                        return;
                    }

                    this.authService.guardarSesion(result.object);

                    this.router.navigate(['/home']);
                },
                error: (error) => {
                    console.error(error);
                    this.errorMessage = 'No se pudo conectar con el servidor.';
                }
            });
    }
    irARegistro(): void {
        this.router.navigate(['/register']);
    }
}