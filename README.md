# 📘 C214 - Engenharia de Software

Repositório para registro do exercício desenvolvido na disciplina C214 no Instituto Nacional de Telecomunicações (Inatel).

**Curso:** Engenharia de Software  
**Elaborado por:** Iza Lopes

## 🕗 Inatel-Schedules

O projeto implementa a classe **`Horarios`** é responsável por processar dados JSON referentes aos horários de atendimento dos professores do Inatel. 
Ela utiliza um serviço de parsing injetado para converter o JSON de entrada em um objeto JavaScript, validando a presença e o formato corretos dos campos necessários.

## 🔍 Funcionalidades

- ✅ Processamento e validação de dados JSON.
- 🏢 Determinação do prédio com base no número da sala.
- ⚠️ Tratamento de erros para entradas inválidas e dados ausentes.

## 🛠️ Pré-requisitos

- **[Node.js](https://nodejs.org/en)**
- **[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)** (ou **yarn**)

## 🚀 Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Izalp/Inatel-Schedules.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd horario-atendimento
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

## 🧪 Execução de Testes

Para executar os testes, use o comando:

```bash
npm test
```

Isso executará os testes definidos e coletará a cobertura de código.

## 📌 Detalhes do Código

### 🔄 Injeção de Dependência

A classe `Horarios` utiliza um padrão de injeção de dependência para o serviço de parsing JSON (`jsonParser`). 
Esse padrão permite que a classe seja testada de forma isolada, substituindo o serviço de parsing real por um mock durante os testes.

### 🤖 Mock Automático

Para garantir que os testes da classe `Horarios` sejam independentes e não dependam do código real do parser JSON, um mock automático é utilizado. 
O mock substitui o parser real e permite definir comportamentos esperados para a função de parsing, além de verificar se o método foi chamado com os parâmetros corretos.

### ⚠️ Tratamento de Exceções

A classe `Horarios` possui várias validações para garantir que os dados JSON fornecidos estejam corretos. 
Se os dados não estiverem conforme o esperado, a classe lança erros com mensagens específicas. 

### 🛡️ Validação de Dados

A validação de dados inclui a verificação dos campos obrigatórios e a validação do número da sala. 
Campos obrigatórios são verificados para garantir que não estejam ausentes, e o número da sala é validado para garantir que esteja dentro do intervalo permitido (1 a 25).

## 🧩 Suíte de Testes - Casos de Sucesso e Falha

### ✔️ Cenários de Sucesso

- JSON válido com sala 3 e definir predio como 1
- JSON válido com sala 7 e definir predio como 2
- JSON válido com sala 12 e definir predio como 3
- JSON válido com sala 18 e definir predio como 4
- JSON válido com sala 21 e definir predio como 6
- JSON com sala no limite inferior e definir predio como 1
- JSON com sala no limite superior do prédio 1 e definir predio como 1
- JSON com sala no limite superior do prédio 2 e definir predio como 2
- JSON com sala no limite superior do prédio 3 e definir predio como 3
- JSON com sala no limite superior do prédio 4 e definir predio como 4

### ❌ Cenários de Falha

- Número da sala for maior que 25
- Número da sala for menor que 1
- String JSON vazia
- A sala não for um número
- JSON não tiver campo "nomeDoProfessor"
- JSON não tiver campo "horarioDeAtendimento"
- JSON não tiver campo "periodo"
- JSON não tiver campo "sala"
- JSON tiver campo adicional
- O campo "sala" estiver vazio


