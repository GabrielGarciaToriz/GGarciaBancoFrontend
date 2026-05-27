export interface RegisterRequest {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    password: string;
    idBanco: number;
}

export interface RegisterResponse {
  idUsuario: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  idBanco: number;
  numeroTarjeta?: string;
}