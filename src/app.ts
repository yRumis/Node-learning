import express, { type Request, type Response} from 'express'
import clienteRoutes from './routes/cliente.routes.js'
import authRoutes from './routes/auth.routes.js'

export const app = express();
app.use(express.json());

app.get('/',(req: Request, res: Response)=>{
    res.json({message: 'API organizada por camadas'})
})

app.use('/clientes', clienteRoutes)
app.use('/auth', authRoutes)




export default app;