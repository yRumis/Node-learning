import {prisma} from '../lib/prisma.js'
import { type CreateClienteDTO } from '../types/cliente.types.js'

class ClienteRepository{

    async findAll(){
        return await prisma.cliente.findMany({
            orderBy: { criadoEm: 'desc'}
        });
    }

    async findById(id: number){
        return await prisma.cliente.findUnique({ where: {id}});
    }

    async create(data: CreateClienteDTO){
        return await prisma.cliente.create({data});
    }

    async update(id: number, data:Partial<CreateClienteDTO>){
        return await prisma.cliente.update({ where: {id}, data});
    }

    async delete (id: number){
        return await prisma.cliente.delete({where: {id}});
    }
}

export default new ClienteRepository();