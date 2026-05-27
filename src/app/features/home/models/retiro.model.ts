export interface RetiroRequest {
    idUsuario: number;
    idTarjeta: number;
    idCajero: number;
    monto: number;
}

export interface RetiroResponse {
    idRetiro?: number;
    monto?: number;
    mensaje?: string;
}