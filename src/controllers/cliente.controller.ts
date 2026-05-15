import { type Request, type Response } from "express";
import clienteService from "../services/cliente.service.js";

type Params = {
        id: string
    }

class ClienteController {
    async listar(req: Request, res: Response){
        const clientes = await clienteService.listarTodos();
        res.json(clientes)
    }

   
 
    async buscarPorId (req: Request<Params>, res: Response){
        const id = parseInt(req.params.id)
        const cliente = await clienteService.buscarPorId(id);
        res.json(cliente)
    }

    async criar(req: Request, res: Response){
        const cliente = await clienteService.criar(req.body);
        res.status(201).json(cliente)
    }

    async atualizar (req: Request<Params>, res: Response){
        const id = parseInt(req.params.id)
        const cliente = await clienteService.atualizar(id, req.body)
        res.json(cliente);
    }

    async deletar(req: Request<Params>, res: Response){
        const id = parseInt(req.params.id)
        const cliente = await clienteService.delete(id)
        res.json({messsage: "Usuario deletado com sucesso"})
    }

}

export default new ClienteController();