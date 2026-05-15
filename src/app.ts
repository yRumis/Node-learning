import express, { type Request, type Response} from 'express'
import { prisma } from './lib/prisma.js';
const app = express();
app.use(express.json());

app.get('/',(req: Request, res: Response)=>{
    res.status(200).json({message: 'prisma esta funcionando'})
})

app.get('/clientes',async (req: Request, res: Response)=>{

    try{
        const clientes = await prisma.cliente.findMany({
            orderBy: { criadoEm: 'desc' }
        })

        res.json(clientes);

    }catch(error){
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar clientes" })
    }

})
        type Params = {
            id: string
        }

app.get('/clientes/:id', async (req: Request<Params>, res: Response)=>{                         

    try{

        const id = parseInt(req.params.id)
        const clientes = await prisma.cliente.findUnique({
            where: { id }
        })

        if(!clientes){
            return res.status(404).json({error: ' cliente nao encontrado'})
        }

        res.json(clientes);

    }catch(error){
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar clientes" })
    }

})

app.post('/clientes', async (req: Request, res: Response) =>{

    try {
      const { nome, email, idade } = req.body;

      if (!nome || !email) {
        return res.status(400).json({ error: " Nome e email obrigatorios" });
      }

      const cliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          idade,
        },
      });

      res.status(200).json(cliente);
    } catch (error: any) {
        if(error.code === 'P2002'){
            return res.status(400).json({ error: 'email ja cadastrado'})
        }
        res.status(500).json({ error: "Erro ao criar cliente" });
    }
    
})

app.put('/clientes/:id', async (req: Request<Params>, res: Response)=>{
    try{
        const id = parseInt(req.params.id);
        const { nome, email, idade } = req.body;

        const clientes = await prisma.cliente.update({
            where: { id },
            data: {
                nome,
                email,
                idade
            }
        })

        res.status(201).json(clientes)

    }catch(error: any){
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }

    
})

app.delete('/clientes/:id', async (req: Request<Params>, res: Response)=>{
    try{
        const id = parseInt(req.params.id)
            await prisma.cliente.delete({
                where: {id}
        })

        return res.json({message: "usuario deletado com sucesso"})
    }catch(error: any){
         if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
})



app.listen(3000, ()=>{
    console.log("estamos rodando normalmente")
})