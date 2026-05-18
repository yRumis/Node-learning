import express, { type Request, type Response} from 'express'
const app = express();
app.use(express.json());

app.get('/',(req: Request, res: Response)=>{
    res.json({message: 'API organizada por camadas'})
})



app.listen(3000, ()=>{
    console.log("estamos rodando normalmente")
})