import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription, switchMap, finalize } from 'rxjs';
import { UsuarioService } from '../../service/usuario.service';

@Component({
    selector: 'app-esperando-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './esperando.page.html',
    styleUrls: ['./esperando.page.css']
})
export class EsperandoPage implements OnInit, OnDestroy {

    publicId: string = '';
    pollingSub!: Subscription;

    estado: 'esperando' | 'activado' | 'reenviando' = 'esperando';
    mensajeReenvio: string = '';

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly usuarioService: UsuarioService
    ) { }

    ngOnInit(): void {
        this.publicId = this.route.snapshot.queryParamMap.get('id') || '';

        if (!this.publicId) {
            this.router.navigate(['/login']);
            return;
        }

        this.pollingSub = interval(3000).pipe(
            switchMap(() => this.usuarioService.verificarEstatus(this.publicId))
        ).subscribe({
            next: (res) => {
                if (res.correct && res.object === true) {
                    this.cuentaActivada();
                }
            }
        });
    }

    cuentaActivada(): void {
        if (this.pollingSub) this.pollingSub.unsubscribe();
        this.estado = 'activado';

        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 3000);
    }

    reenviarCorreo(): void {
        this.estado = 'reenviando';
        this.mensajeReenvio = '';

        this.usuarioService.reenviarActivacion(this.publicId)
            .pipe(finalize(() => this.estado = 'esperando'))
            .subscribe({
                next: (res) => {
                    if (res.correct) {
                        this.mensajeReenvio = 'Correo reenviado. Revisa tu bandeja de entrada.';
                    } else {
                        this.mensajeReenvio = res.errorMessage || 'Error al reenviar el correo.';
                    }
                }
            });
    }

    ngOnDestroy(): void {
        if (this.pollingSub) {
            this.pollingSub.unsubscribe();
        }
    }
}