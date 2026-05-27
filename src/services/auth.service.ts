import  bcrypt from 'bcrypt'
import   jwt  from 'jsonwebtoken'
import userRepository from '../repositories/user.repository.js'
import { type RegisterDTO, type LoginDTO } from '../types/auth.types.js'
import dotenv from 'dotenv'

dotenv.config()
const SECRET_KEY = process.env.JWT_SECRET || '';


class AuthService {
    async registrar(data: RegisterDTO){
        const usuarioExiste = await userRepository.findByEmail(data.email);
        if(usuarioExiste) throw new Error('Email ja existe');
        const senhaHash = await bcrypt.hash(data.senha, 8);

        const user = await userRepository.create({
            ...data,
            senha: senhaHash
        })

        const token = jwt.sign({ 
            id: user.id,
            email: user.email,
            nome: user.nome

        }, SECRET_KEY, 
            { expiresIn: '7d'}
        );

        return {
            user: {id: user.id, nome: user.nome, email: user.email},
            token
        }
    }

    async login(data: LoginDTO ){
        const user = await userRepository.findByEmail(data.email);
        if (!user) throw new Error('Credenciais invalidas');

        const senhaCorreta = await bcrypt.compare(data.senha, user.senha);
        if(!senhaCorreta) throw new Error('Senha incorreta');

        const token = jwt.sign({ 
            id: user.id,
            email: user.email,
            nome: user.nome

        }, SECRET_KEY, 
            { expiresIn: '7d'}
        );

        return{
            user: { id: user.id, nome: user.nome, email: user.email },
            token
        }
    }
    
}
    
export default new AuthService();  




