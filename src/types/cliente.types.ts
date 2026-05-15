export interface CreateClienteDTO {
    nome: string;
    email: string;
    idade?: number;
}


// model
export interface ClienteResponse {
    id: number;
    nome: string;
    email: string;
    idade?: number | null;
    criadoEm: Date;
    atualizadoEm: Date;
}