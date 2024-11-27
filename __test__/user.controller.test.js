const User = require('./../models/User')
const request = require('supertest');
const app = require('./../index')

jest.mock('./../models/User', ()=>{
    return {
        find: jest.fn(),
        findOne: jest.fn(),
        findByIdAndDelete: jest.fn()
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
    let wrongPassword = 'wrong-password';
    let mockUserResponse = {_id: userId, email: userEmail, password: userPassword};
    let mockUserWrongPassword = {_id: userId, email: userEmail, password: wrongPassword};
    let mockBodyRequest = {email: userEmail, password: userPassword};
    let mockUserNotFound = {ok: false, msg: 'User doesnt exist!!'};
    let mockWrongPasswordResponse = {ok: false, msg: 'Incorrect password!!'};
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
        expect(response.body).toHaveProperty('token');
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
    it('Debería devolver error si el usuario no existe', async () => {
        // Arrange - Simular que el usuario no existe en la base de datos
        User.findOne.mockResolvedValueOnce(null);

        // Act - Llamar al endpoint login
        const response = await request(app)
            .post(urlLoginPath)
            .send(mockBodyRequest);

        // Assert - Verificar respuesta en caso de que el usuario no exista
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(mockUserNotFound);
    });

    it('Deberia tener una respuesta http 400 cuando la contraseña es incorrecta', async () => {
        // Arrange  - Simular que se retorna un usuario con un email especifico
        User.findOne.mockResolvedValueOnce(mockUserResponse);

        // Act - Llamar al endpoint login
        const response = await request(app)
            .post(urlLoginPath)
            .send(mockUserWrongPassword);
        
        // Assert - Validar las respuestas esperadas al hacer la acción
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(mockWrongPasswordResponse);
    })
})

describe('CREATE USER ',()=>{
    let userId = 'test-id';
    let userEmail = 'test@gmail.com';
    let userPassword = 'testPassword1!';
    let mockBodyRequest = {email: userEmail, password: userPassword};

    let registerUrlPath = '/api/register';

    it('Debería ocurrir un error al intentar crear un usuario',async ()=>{
        // Arrange - Error al intentar conectarse con cualquier cosa externa
        User.findOne.mockRejectedValueOnce(new Error('Ha ocurrido un error'));

        // Act - Llamada a la api para crear un usuario
        const response = await request(app)
        .post(registerUrlPath)
        .send(mockBodyRequest);

        // Assert - Verificar las respuestas esperadas de acuerdo al controlador
        expect(response.statusCode).toBe(500);
    })
})

describe('DELETE USERS BY ID', ()=>{

    let userEmail = 'test@gmail.com';
    let userPassword = 'testPassword1!';
    let deleteUrlPath = "/api/delete-user/";
    let userId = "test-id";

    const mockDeleteResponse = {email: userEmail, password: userPassword};
    const mockBodyResponse = { ok: true, msg: `User with ID ${userId} deleted successfully` }

    it('Se intenta eliminar el usuario pero no existe en la base de datos',async ()=>{
        // Arrange 
        User.findByIdAndDelete.mockResolvedValueOnce(null);

        // Act
        const response = await request(app)
        .delete(`${deleteUrlPath}${userId}`);

        // Assert
        expect(response.statusCode).toBe(404);

    });

    it('Se realiza el borrado correctamente', async ()=>{
        // Arrange
        User.findByIdAndDelete.mockResolvedValueOnce(mockDeleteResponse);

        // Act 
        const response = await request(app)
        .delete(`${deleteUrlPath}${userId}`);

        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockBodyResponse);
    })
})