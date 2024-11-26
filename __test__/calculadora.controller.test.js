describe('Conjunto 1 - Test: Operacion suma', () =>{

    it('Mi primer test', ()=>{
        // Patrón AAA - Arrange Act Assert

        // Arrange
        const numero1 = 2;
        const numero2 = 2;

        // Act
        const resultado = numero1 + numero2;
        
        // Assert
        expect(resultado).toBe(4);
    })
})

describe('Conjunto 2 - Test: Operacion multiplicacion', () =>{

    it('Testeando nuevas funcionalidades', ()=>{
        // Patrón AAA - Arrange Act Assert

        // Arrange
        const numero1 = 2;
        const numero2 = 2;

        // Act
        const resultado = numero1 * numero2;
        
        // Assert
        expect(resultado).toBe(4);
    })
})

describe('Conjunto 3 - Test: Operacion resta', () =>{

    it('Testeando nuevas funcionalidades', ()=>{
        // Patrón AAA - Arrange Act Assert

        // Arrange
        const numero1 = 2;
        const numero2 = 2;

        // Act
        const resultado = numero1 - numero2;
        
        // Assert
        expect(resultado).toBe(0);
    })
})

describe('Conjunto 4 - Test: Operacion division', () =>{

    it('Testeando nuevas funcionalidades', ()=>{
        // Patrón AAA - Arrange Act Assert

        // Arrange
        const numero1 = 2;
        const numero2 = 2;

        // Act
        const resultado = numero1 / numero2;
        
        // Assert
        expect(resultado).toBe(1);
    })
})