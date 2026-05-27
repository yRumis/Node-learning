import { prisma } from '../lib/prisma.js'
import { type RegisterDTO } from '../types/auth.types.js'

class UserRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({where: {email}});
    }

    async create(data: RegisterDTO){
        return prisma.user.create({data})
    }
}

export default new UserRepository();