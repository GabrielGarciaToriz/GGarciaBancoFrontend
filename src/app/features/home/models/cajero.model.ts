export interface CajeroConsultaRequest {
  idUsuario: number;
  numeroTarjeta: string;
}

export interface CajeroResponse {
  idCajero: number;
  nombreCajero: string;
  activo: boolean;
  idBanco: number;
  nombreBanco: string;
}

export interface InventarioCajeroResponse {
  idCajero: number;
  idDenominacion: number;
  tipo: string;
  valorCentavos: number;
  valor: number;
  cantidadActual: number;
  totalCentavos: number;
  total: number;
}

export interface DashboardCajeroResponse {
  cajero: CajeroResponse;
  inventario: InventarioCajeroResponse[];
}