export interface RetiroRequest {
    idUsuario: number;
    numeroTarjeta: string;
    idCajero: number;
    monto: number;
}

export interface RetiroResponse {
    idRetiro?: number;
    monto?: number;
    mensaje?: string;
}