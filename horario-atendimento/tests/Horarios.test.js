import Horarios from '../src/Horarios';
import jsonParserMock from '../mocks/jsonParserMock';

jest.mock('../mocks/jsonParserMock'); // Mock automático da dependência

const invalidJsonError = 'JSON inválido ou dados ausentes';
const invalidRoomError = 'Número da sala inválido';

describe('Horarios Class Tests', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jsonParserMock.parse.mockClear();
    });

    // Testes de Sucesso
    describe('Cenários de Sucesso', () => {
        it('Deve processar corretamente o JSON válido com sala 3 e definir predio como 1', () => {
            const jsonData = '{"nomeDoProfessor": "Christopher", "horarioDeAtendimento": "17:00 - 18:00", "periodo": "integral", "sala": 3}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, jsonParserMock);

            expect(horario.getPredio()).toBe(1);
            expect(jsonParserMock.parse).toHaveBeenCalledWith(jsonData);
        });

        it('Deve processar corretamente o JSON válido com sala 7 e definir predio como 2', () => {
            const jsonData = '{"nomeDoProfessor": "Renzo", "horarioDeAtendimento": "14:00 - 15:00", "periodo": "noturno", "sala": 7}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, jsonParserMock);

            expect(horario.getPredio()).toBe(2);
        });

        it('Deve processar corretamente o JSON válido com sala 12 e definir predio como 3', () => {
            const jsonData = '{"nomeDoProfessor": "Ynoguti", "horarioDeAtendimento": "10:00 - 11:00", "periodo": "integral", "sala": 12}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, jsonParserMock);

            expect(horario.getPredio()).toBe(3);
        });

        it('Deve processar corretamente o JSON válido com sala 18 e definir predio como 4', () => {
            const jsonData = '{"nomeDoProfessor": "Marcelo", "horarioDeAtendimento": "16:00 - 17:00", "periodo": "noturno", "sala": 18}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, jsonParserMock);

            expect(horario.getPredio()).toBe(4);
        });

        it('Deve processar corretamente o JSON válido com sala 21 e definir predio como 6', () => {
            const jsonData = '{"nomeDoProfessor": "Soned", "horarioDeAtendimento": "18:00 - 19:00", "periodo": "integral", "sala": 21}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, jsonParserMock);

            expect(horario.getPredio()).toBe(6);
        });

        it('Deve processar JSON com sala no limite inferior e definir predio como 1', () => {
            const jsonData = '{"nomeDoProfessor": "Saldanha", "horarioDeAtendimento": "17:00 - 18:00", "periodo": "integral", "sala": 1}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, jsonParserMock);

            expect(horario.getPredio()).toBe(1);
        });

        it('Deve processar JSON com sala no limite superior do prédio 1 e definir predio como 1', () => {
            const jsonData = '{"nomeDoProfessor": "Felipe Bueno", "horarioDeAtendimento": "14:00 - 15:00", "periodo": "integral", "sala": 5}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, jsonParserMock);

            expect(horario.getPredio()).toBe(1);
        });

        it('Deve processar JSON com sala no limite superior do prédio 2 e definir predio como 2', () => {
            const jsonData = '{"nomeDoProfessor": "Daniela", "horarioDeAtendimento": "15:00 - 16:00", "periodo": "noturno", "sala": 10}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, jsonParserMock);

            expect(horario.getPredio()).toBe(2);
        });

        it('Deve processar JSON com sala no limite superior do prédio 3 e definir predio como 3', () => {
            const jsonData = '{"nomeDoProfessor": "Estevan", "horarioDeAtendimento": "10:00 - 11:00", "periodo": "integral", "sala": 15}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, jsonParserMock);

            expect(horario.getPredio()).toBe(3);
        });

        it('Deve processar JSON com sala no limite superior do prédio 4 e definir predio como 4', () => {
            const jsonData = '{"nomeDoProfessor": "Jonas", "horarioDeAtendimento": "16:00 - 17:00", "periodo": "noturno", "sala": 20}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, jsonParserMock);

            expect(horario.getPredio()).toBe(4);
        });
    });

    // Testes de Falha
    describe('Cenários de Falha', () => {
        it('Deve lançar erro se o número da sala for maior que 25', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "17:00 - 18:00", "periodo": "integral", "sala": 26}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, jsonParserMock)).toThrow(invalidRoomError);
        });

        it('Deve lançar erro se o número da sala for menor que 1', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "9:00 - 10:00", "periodo": "integral", "sala": 0}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, jsonParserMock)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro para string JSON vazia', () => {
            const jsonData = '';
            jsonParserMock.parse.mockImplementation(() => {
                throw new Error(invalidJsonError);
            });

            expect(() => new Horarios(jsonData, jsonParserMock)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro se a sala não for um número', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "9:00 - 10:00", "periodo": "integral", "sala": "A"}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, jsonParserMock)).toThrow(invalidRoomError);
        });

        it('Deve lançar erro se o JSON não tiver campo "nomeDoProfessor"', () => {
            const jsonData = '{"horarioDeAtendimento": "9:00 - 10:00", "periodo": "integral", "sala": 3}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, jsonParserMock)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro se o JSON não tiver campo "horarioDeAtendimento"', () => {
            const jsonData = '{"nomeDoProfessor": "João", "periodo": "integral", "sala": 3}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, jsonParserMock)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro se o JSON não tiver campo "periodo"', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "9:00 - 10:00", "sala": 3}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, jsonParserMock)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro se o JSON não tiver campo "sala"', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 11:00", "periodo": "integral"}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, jsonParserMock)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro se o JSON tiver campo adicional', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 11:00", "periodo": "integral", "sala": 4, "campoAdicional": "valor"}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, jsonParserMock)).toThrow("JSON inválido");
        });

        it('Deve lançar erro se o campo "sala" estiver vazio', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 11:00", "periodo": "integral", "sala": ""}';
            jsonParserMock.parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, jsonParserMock)).toThrow(invalidJsonError);
        });
    });
});
