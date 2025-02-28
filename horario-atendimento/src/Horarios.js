class Horarios {
    constructor(jsonData, jsonParser) {
        this.jsonParser = jsonParser; // Injeta o serviço de parsing Json
        this.processaJson(jsonData);
    }

    // Processa os dados JSON fornecidos
    processaJson(jsonData) {
        try {
            // Usa o serviço injetado para fazer o parsing
            const data = this.jsonParser.parse(jsonData);

            // Valida a presença dos campos necessários
            if (!data.nomeDoProfessor || !data.horarioDeAtendimento || !data.periodo || !data.sala) {
                throw new Error('JSON inválido ou dados ausentes');
            }

            // Verifica se há campos adicionais
            const allowedFields = ['nomeDoProfessor', 'horarioDeAtendimento', 'periodo', 'sala'];
            const extraFields = Object.keys(data).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw new Error('JSON inválido');
            }

            // Valida o número da sala
            if (typeof data.sala !== 'number' || data.sala < 1 || data.sala > 25) {
                throw new Error('Número da sala inválido');
            }

            this.nomeDoProfessor = data.nomeDoProfessor;
            this.horarioDeAtendimento = data.horarioDeAtendimento;
            this.periodo = data.periodo;
            this.sala = data.sala;

            // Calcula o prédio com base na sala
            this.predio = this.definePredio(this.sala);
        } catch (error) {
            console.log('Erro ao processar JSON:', error);
            throw error;
        }
    }

    definePredio(sala) {
        if (sala >= 1 && sala <= 5) return 1;
        if (sala >= 6 && sala <= 10) return 2;
        if (sala >= 11 && sala <= 15) return 3;
        if (sala >= 16 && sala <= 20) return 4;
        if (sala >= 21 && sala <= 25) return 6;
    }

    getPredio() {
        return this.predio;
    }
}

export default Horarios;
