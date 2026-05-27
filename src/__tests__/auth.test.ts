import request from 'supertest';
import app from '../app.js';  

describe('Auth Routes', () => {

    test('Deve registrar um novo usuário com sucesso', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                nome: "Teste Jest",
                email: `teste${Date.now()}@email.com`,
                senha: "12345678"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body.user).toHaveProperty('email');
    });

    test('Não deve registrar usuário com email já existente', async () => {
        // Primeiro cria um usuário
        await request(app)
            .post('/auth/register')
            .send({
                nome: "Duplicado",
                email: "duplicado@email.com",
                senha: "12345678"
            });

        // Tenta criar novamente
        const response = await request(app)
            .post('/auth/register')
            .send({
                nome: "Duplicado 2",
                email: "duplicado@email.com",
                senha: "12345678"
            });

        expect(response.status).toBe(400);
    });

});