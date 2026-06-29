# AutoCare API

API REST para o **AutoCare**, um app de controle de manutenção de veículos. Esta é a camada de backend que serve os dados consumidos pelas versões web e mobile do projeto.

Construída com Node.js, Express, TypeScript e SQLite, com uma camada de acesso a dados desacoplada via injeção de dependência.

## Tecnologias

- **Node.js** + **Express** — servidor HTTP e roteamento
- **TypeScript** — tipagem estática em todo o projeto
- **SQLite** (via `better-sqlite3`) — banco de dados embutido e síncrono
- **tsx** — execução de TypeScript em desenvolvimento, sem etapa de build

## Arquitetura

O projeto é organizado em camadas, cada uma com uma responsabilidade única:

```
src/
  config/        # conexão com o banco (injetável)
  models/        # tipos das entidades (Vehicle, Maintenance)
  repositories/  # acesso ao banco e tradução de dados
  controllers/   # lógica de cada requisição
  routes/        # mapeamento de endpoints
  app.ts         # configuração do Express
  server.ts      # composição das dependências e inicialização
```

Decisões de projeto que vale destacar:

- **Injeção de dependência:** o banco é criado fora dos repositórios e injetado neles; os repositórios são injetados nos controllers. Nada cria suas próprias dependências. Isso mantém cada camada testável de forma isolada e permite trocar a implementação do banco sem reescrever a lógica da aplicação.
- **Tradução na borda do banco:** o SQLite usa `snake_case` nas colunas (`current_km`), enquanto a aplicação trabalha em `camelCase` (`currentKm`). Essa conversão acontece apenas na camada de repositório, isolando o resto do código do formato do banco.
- **Regra de negócio nos controllers:** antes de criar ou listar manutenções, a API verifica se o veículo existe e retorna `404` de forma controlada, em vez de deixar a foreign key do banco falhar.

## Entidades

**Vehicle**

```typescript
type Vehicle = {
  id: string;
  name: string;
  type: 'car' | 'motorcycle';
  currentKm: number;
  createdAt: string;
};
```

**Maintenance**

```typescript
type Maintenance = {
  id: string;
  vehicleId: string;
  type: 'oil_change' | 'tire_rotation';
  lastKm: number;
  intervalKm: number;
  createdAt: string;
};
```

Uma manutenção sempre pertence a um veículo (relação um-para-muitos).

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Verifica se a API está no ar |
| `GET` | `/vehicles` | Lista todos os veículos |
| `POST` | `/vehicles` | Cria um veículo |
| `GET` | `/vehicles/:vehicleId/maintenances` | Lista as manutenções de um veículo |
| `POST` | `/vehicles/:vehicleId/maintenances` | Cria uma manutenção para um veículo |

O `id` e o `createdAt` são gerados pelo servidor — o cliente não os envia.

### Exemplos

Criar um veículo:

```bash
curl -X POST http://localhost:3333/vehicles \
  -H "Content-Type: application/json" \
  -d '{"name":"Civic","type":"car","currentKm":85000}'
```

Criar uma manutenção para esse veículo:

```bash
curl -X POST http://localhost:3333/vehicles/<vehicleId>/maintenances \
  -H "Content-Type: application/json" \
  -d '{"type":"oil_change","lastKm":80000,"intervalKm":10000}'
```

Tentar criar uma manutenção para um veículo inexistente retorna `404`:

```json
{ "error": "Vehicle not found" }
```

## Como rodar localmente

Pré-requisitos: Node.js instalado.

```bash
# clonar o repositório
git clone https://github.com/coutojeferson/autocare-api.git
cd autocare-api

# instalar as dependências
npm install

# iniciar em modo de desenvolvimento (com reload automático)
npx tsx watch src/server.ts
```

A API sobe em `http://localhost:3333`. O banco SQLite é criado automaticamente no primeiro boot.

## Status e próximos passos

A API cobre o CRUD essencial de veículos e manutenções com validação de relacionamento. Próximos passos planejados:

- Testes automatizados (unitários e de integração) com banco em memória
- Deploy em produção com persistência real
- Validação de entrada nas requisições
