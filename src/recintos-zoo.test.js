import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo()
            resultado.analisaRecintos('UNICORNIO', 1);
            expect(resultado.mensagemErro).toBe("Animal inválido");
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo()
            resultado.analisaRecintos('MACACO', 0);
            expect(resultado.mensagemErro).toBe("Quantidade inválida");
    });

    test('Não deve encontrar recintos para 30 macacos', () => {
            const resultado = new RecintosZoo()
            resultado.analisaRecintos('CROcoDilo', 30);
            expect(resultado.mensagemErro).toBe("Não há recinto viável");
        });

    test('Deve inserir 2 macacos', () => {
        const resultado = new RecintosZoo()
        resultado.analisaRecintos('MACACO', 2);
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
    });
    
    
    test('Deve inserir crocodilos', () => {
        const resultado = new RecintosZoo()
        resultado.analisaRecintos('CROCODILO', 2);
        expect(resultado.recintosViaveis[3]).toBe('Recinto 4 (espaço livre: 2 total: 8)');
    });

    test('Deve inserir hipopótamos', () => {
        const resultado = new RecintosZoo()
        resultado.analisaRecintos('HIPOPÓTAMO', 2);
        expect(resultado.recintosViaveis[3]).toBe('Recinto 4 (espaço livre: 0 total: 8)');
    });

    test('Deve inserir leões', () => {
        const resultado = new RecintosZoo()
        resultado.analisaRecintos('LEÃO', 2);
        expect(resultado.recintosViaveis[4]).toBe('Recinto 5 (espaço livre: 0 total: 9)');
    });
    
    test('Deve inserir 2 gazelas', () => {
        const resultado = new RecintosZoo()
        resultado.analisaRecintos('GAZELA', 2);
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 1 total: 7)');
    });

    test('Não deve inserir 56 leões', () => {
        const resultado = new RecintosZoo()
        resultado.analisaRecintos('LEÃO', 56);
        expect(resultado.recintosViaveis[4]).toBe('Recinto 5 (espaço livre: 6 total: 9)');
    });
    
    test('Não deve inserir 12 hipopótamos', () => {
        const resultado = new RecintosZoo()
        resultado.analisaRecintos('HIPOPÓTAMO', 12);
        expect(resultado.recintosViaveis[4]).toBe('Recinto 5 (espaço livre: 6 total: 9)');
    });
});