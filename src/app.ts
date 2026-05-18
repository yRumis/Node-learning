import express, { type Request, type Response} from 'express'
import clienteRoutes from './routes/cliente.routes.js'

const app = express();
app.use(express.json());

app.get('/',(req: Request, res: Response)=>{
    res.json({message: 'API organizada por camadas'})
})

app.use('/clientes', clienteRoutes)

app.listen(3000, ()=>{
    console.log("estamos rodando normalmente")
})