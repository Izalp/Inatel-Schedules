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
            const jsonData = '{"nomeDoProfessor": "Christopher", "horarioDeAtendimento": "17:00 - 19:00", "periodo": "integral", "sala": 3}';
            parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, mockJsonParser);

            expect(horario.getPredio()).toBe(1);
            expect(parse).toHaveBeenCalledWith(jsonData);
        });

        it('Deve processar corretamente o JSON válido com sala 7 e definir predio como 2', () => {
            const jsonData = '{"nomeDoProfessor": "Renzo", "horarioDeAtendimento": "14:00 - 16:00", "periodo": "noturno", "sala": 7}';
            parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, mockJsonParser);

            expect(horario.getPredio()).toBe(2);
        });

        it('Deve processar corretamente o JSON válido com sala 12 e definir predio como 3', () => {
            const jsonData = '{"nomeDoProfessor": "Ynoguti", "horarioDeAtendimento": "09:00 - 11:00", "periodo": "integral", "sala": 12}';
            parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, mockJsonParser);

            expect(horario.getPredio()).toBe(3);
        });

        it('Deve processar corretamente o JSON válido com sala 18 e definir predio como 4', () => {
            const jsonData = '{"nomeDoProfessor": "Marcelo", "horarioDeAtendimento": "16:00 - 18:00", "periodo": "noturno", "sala": 18}';
            parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, mockJsonParser);

            expect(horario.getPredio()).toBe(4);
        });

        it('Deve processar corretamente o JSON válido com sala 21 e definir predio como 6', () => {
            const jsonData = '{"nomeDoProfessor": "Soned", "horarioDeAtendimento": "16:00 - 18:00", "periodo": "integral", "sala": 21}';
            parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, mockJsonParser);

            expect(horario.getPredio()).toBe(6);
        });

        it('Deve processar JSON com sala no limite inferior e definir predio como 1', () => {
            const jsonData = '{"nomeDoProfessor": "Paulo", "horarioDeAtendimento": "17:00 - 19:00", "periodo": "integral", "sala": 1}';
            parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, mockJsonParser);

            expect(horario.getPredio()).toBe(1);
        });

        it('Deve processar JSON com sala no limite superior do prédio 1 e definir predio como 1', () => {
            const jsonData = '{"nomeDoProfessor": "Pedro", "horarioDeAtendimento": "08:00 - 10:00", "periodo": "integral", "sala": 5}';
            parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, mockJsonParser);

            expect(horario.getPredio()).toBe(1);
        });

        it('Deve processar JSON com sala no limite superior do prédio 2 e definir predio como 2', () => {
            const jsonData = '{"nomeDoProfessor": "Fernanda", "horarioDeAtendimento": "15:00 - 17:00", "periodo": "noturno", "sala": 10}';
            parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, mockJsonParser);

            expect(horario.getPredio()).toBe(2);
        });

        it('Deve processar JSON com sala no limite superior do prédio 3 e definir predio como 3', () => {
            const jsonData = '{"nomeDoProfessor": "Renata", "horarioDeAtendimento": "10:00 - 12:00", "periodo": "integral", "sala": 15}';
            parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, mockJsonParser);

            expect(horario.getPredio()).toBe(3);
        });

        it('Deve processar JSON com sala no limite superior do prédio 4 e definir predio como 4', () => {
            const jsonData = '{"nomeDoProfessor": "Thiago", "horarioDeAtendimento": "18:00 - 20:00", "periodo": "noturno", "sala": 20}';
            parse.mockReturnValue(JSON.parse(jsonData));

            const horario = new Horarios(jsonData, mockJsonParser);

            expect(horario.getPredio()).toBe(4);
        });
    });

    // Testes de Falha
    describe('Cenários de Falha', () => {
        it('Deve lançar erro quando o campo estiver ausente no JSON', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 12:00", "sala": 3}'; // JSON inválido (campo "periodo" ausente)
            parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, mockJsonParser)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro se o número da sala for maior que 25', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 12:00", "periodo": "integral", "sala": 26}';
            parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, mockJsonParser)).toThrow(invalidRoomError);
        });

        it('Deve lançar erro se o número da sala for menor que 1', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 12:00", "periodo": "integral", "sala": 0}';
            parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, mockJsonParser)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro para string JSON vazia', () => {
            const jsonData = '';
            parse.mockImplementation(() => {
                throw new Error(invalidJsonError);
            });

            expect(() => new Horarios(jsonData, mockJsonParser)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro se a sala não for um número', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 12:00", "periodo": "integral", "sala": "A"}';
            parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, mockJsonParser)).toThrow(invalidRoomError);
        });

        it('Deve lançar erro se o JSON não tiver campo "nomeDoProfessor"', () => {
            const jsonData = '{"horarioDeAtendimento": "10:00 - 12:00", "periodo": "integral", "sala": 3}';
            parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, mockJsonParser)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro se o JSON não tiver campo "horarioDeAtendimento"', () => {
            const jsonData = '{"nomeDoProfessor": "João", "periodo": "integral", "sala": 3}';
            parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, mockJsonParser)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro se o JSON não tiver campo "periodo"', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 12:00", "sala": 3}';
            parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, mockJsonParser)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro se o JSON não tiver campo "sala"', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 12:00", "periodo": "integral"}';
            parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, mockJsonParser)).toThrow(invalidJsonError);
        });

        it('Deve lançar erro se o campo "sala" estiver vazio', () => {
            const jsonData = '{"nomeDoProfessor": "João", "horarioDeAtendimento": "10:00 - 12:00", "periodo": "integral", "sala": ""}';
            parse.mockReturnValue(JSON.parse(jsonData));

            expect(() => new Horarios(jsonData, mockJsonParser)).toThrow(invalidJsonError);
        });
    });
});
