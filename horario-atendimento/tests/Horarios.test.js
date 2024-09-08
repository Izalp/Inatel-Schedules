import Horarios from '../src/Horarios';
import mockJsonParser, { parse } from '../mocks/jsonParserMock';

const invalidJsonError = 'JSON inválido ou dados ausentes';
const invalidRoomError = 'Número da sala inválido';

describe('Horarios Class Tests', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        parse.mockClear();
    });

    // Testes de Sucesso
    describe('Cenários de Sucesso', () => {
        it('Deve processar corretamente o JSON válido com sala 3 e definir predio como 1', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 12:00", "periodo": "integral", "sala": 3}';
            parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, mockJsonParser);

            expect(horario.getPredio()).toBe(1);
            expect(parse).toHaveBeenCalledWith(jsonData);
        });
    });

    // Testes de Falha
    describe('Cenários de Falha', () => {
        it('Deve lançar erro para JSON inválido', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 12:00", "sala": 3}'; // JSON inválido (campo "periodo" ausente)
            parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, mockJsonParser)).toThrow(invalidJsonError);
        });
    });
});
