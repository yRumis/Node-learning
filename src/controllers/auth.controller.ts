import { type Request, type Response } from "express";
import authService from "../services/auth.service.js";

class AuthController {
    async registrar(req: Request, res: Response){
        try{
            const resultado = await authService.registrar(req.body);
            res.status(201).json(resultado)
        }catch(error: any){
            console.log(error)
            res.status(400).json({ error: error.message})
        }
    }

    async login(req: Request, res: Response){
        try{
            const resultado = await authService.login(req.body);
            res.json(resultado)
        }catch(error: any){
            res.status(401).json({ error: error.message });
        }
    }
}

export default new AuthController();