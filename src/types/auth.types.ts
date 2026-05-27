export interface RegisterDTO {
    nome: string;
    email: string;
    senha: string;
}

export interface LoginDTO{
    email: string;
    senha: string;
}

export interface AuthResponse {
    user: {
        id: number;
        nome: string;
        email: string;
    };
    token: string;
}