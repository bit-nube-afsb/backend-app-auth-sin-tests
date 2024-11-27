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

    let userId = 'test-user-id';
    let userEmail = 'user@gmail.com';
    let userPassword = 'password';
    let userMock = {_id: userId, email: userEmail, password: userPassword };
    let listMockResponse = [userMock];

    const urlGetPath = '/api/get-users';
    const getErrorResponse = { ok: false, msg: 'Server error' };

    it('Deberia obtener todos los usuarios', async ()=>{
        
        // Arrange - Estar preparado para recibir la lista vacia al llamar el metodo find() del modelo
        User.find.mockResolvedValueOnce(listMockResponse)

        // Act - Llamar a la API
        const response = await request(app).get(urlGetPath);

        // Assert
        expect(response.statusCode).toBe(200);
        // expect(response.body.users.length).toBe(1);
        // expect(response.body.users.length).toBeGreaterThan(0);
        expect(response.body.users.length).toBe(listMockResponse.length);
    })

    it('Deberia obtener un error al intentar traer los usuarios', async ()=> {
        // Arrange - Estar preparado para enviar un error generico
        User.find.mockRejectedValueOnce(new Error('Database eror'))

        // Act - Llamado de la API
        const response = await request(app).get(urlGetPath);
        
        // Assert
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual(getErrorResponse);
    })

})

describe('LOGIN USERS', () => {

    let userId = 'test-id';
    let userEmail = 'test@gmail.com';
    let userPassword = 'test-password';
    let mockUserResponse = {_id: userId, email: userEmail, password: userPassword};
    let mockBodyRequest = {email: userEmail, password: userPassword};

    const urlLoginPath = '/api/login';

    it('Deberia logear un usuario con las credenciales correctas', async ()=>{
        // Arrange - Responder con un usuario de base de datos
        User.findOne.mockResolvedValueOnce(mockUserResponse)

        // Act - Llamado al end point login
        const response = await request(app)
        .post(urlLoginPath)
        .send(mockBodyRequest)
        
        // Assert - Comparar las posibles respuestas del llamado de login
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token')
    })

    it('Deberia tener un error al intentar logearse', async ()=>{
        // Arrange - Lanzar un error o excepción cuando se llame el método de loginUser()
        User.findOne.mockRejectedValueOnce(new Error('Dificultades técnicas'));

        // Act - Llamar al end point de login
        const response = await request(app)
        .post(urlLoginPath)
        .send(mockBodyRequest);

        // Assert - Comparar los posibles respuestas del error de login
        expect(response.statusCode).toBe(500);
    })

})