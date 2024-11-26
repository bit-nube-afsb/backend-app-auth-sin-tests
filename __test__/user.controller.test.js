const User = require('./../models/User')
const request = require('supertest');
const app = require('./../index')

jest.mock('./../models/User', ()=>{
    return {
        find: jest.fn(),
        findOne: jest.fn()
    }
})

describe('GET ALL USERS', ()=>{
    it('Deberia obtener todos los usuarios', async ()=>{
        
        // Arrange - Estar preparado para recibir la lista vacia al llamar el metodo find() del modelo
        User.find.mockResolvedValueOnce([])

        // Act - Llamar a la API
        const response = await request(app).get('/api/get-users');

        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.users.length).toBe(0)
    })

    it('Deberia obtener un error al intentar traer los usuarios', async ()=> {
        // Arrange - Estar preparado para enviar un error generico
        User.find.mockRejectedValueOnce(new Error('Database eror'))

        // Act - Llamado de la API
        const response = await request(app).get('/api/get-users');
        
        // Assert
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ ok: false, msg: 'Server error' })
    })

})

describe('LOGIN USERS', () => {

    it('Deberia logear un usuario con las credenciales correctas', async ()=>{
        // Arrange - Responder con un usuario de base de datos
        User.findOne.mockResolvedValueOnce({_id: 'test-id', email: 'test@gmail.com', password: 'test-password'})

        // Act - Llamado al end point login
        const response = await request(app)
        .post('/api/login')
        .send({email:'test@gmail.com', password: 'test-password'})

        // Assert - Comparar las posibles respuestas del llamado de login
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token')
    })

})