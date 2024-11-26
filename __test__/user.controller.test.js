const User = require('./../models/User')
const request = require('supertest');
const app = require('./../index')

jest.mock('./../models/User', ()=>{
    return {
        find: jest.fn(),
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

    })
})