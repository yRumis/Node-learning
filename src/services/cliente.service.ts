import clienteRepository from "../repositories/cliente.repository.js";
import { type CreateClienteDTO } from "../types/cliente.types.js";

export class ClienteService {

    async listarTodos() {
        return await clienteRepository.findAll();
    }

    async buscarPorId(id: number){
        const cliente = await clienteRepository.findById(id);
        if(!cliente) throw new Error('Cliente nao encontrado')
        return cliente
    }

    async criar(data: CreateClienteDTO) {
        if(!data.email || !data.nome){
            throw new Error("Nome e email sao obrigatorios");
            
        }
        return await clienteRepository.create({
            ...data,
            email: data.email.toLocaleLowerCase()
        })
    }

    async atualizar(id: number, data: Partial<CreateClienteDTO>){
        return await clienteRepository.update(id, data)
    }

    async delete(id: number){
        return await clienteRepository.delete(id);
    }
}

export default new ClienteService();