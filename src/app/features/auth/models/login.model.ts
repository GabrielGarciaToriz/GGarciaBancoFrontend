export interface LoginRequest {
    numeroTarjeta: string;
    password: string;
}

export interface LoginResponse {
    idUsuario: number;
    idTarjeta: number;
    numeroTarjeta: string;
    nombreUsuario: string;
    idBanco: number;
    nombreBanco: string;
}

export interface Result<T> {
    correct: boolean;
    errorMessage?: string | null;
    errorCode?: string | null;
    object?: T | null;
    objects?: T[] | null;
    ex?: any;
}