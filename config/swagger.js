const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'VetCare API',
    description: 'API RESTful para gerenciamento de atendimentos veterinarios da clinica VetCare',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Insira o token JWT no formato: Bearer <token>'
    }
  },
  tags: [
    { name: 'Index', description: 'Informacoes sobre o servico' },
    { name: 'Usuarios', description: 'Cadastro e autenticacao de usuarios' },
    { name: 'Pets', description: 'Gerenciamento de pets' },
    { name: 'Atendimentos', description: 'Gerenciamento de atendimentos' }
  ],
  definitions: {
    UsuarioCriado: {
      id: 1,
      nome: 'Joao Silva',
      usuario: 'joao',
      perfil: 'recepcao'
    },
    NovoUsuario: {
      $nome: 'Joao Silva',
      $usuario: 'joao',
      $senha: '123456',
      perfil: 'recepcao'
    },
    LoginUsuario: {
      $usuario: 'joao',
      $senha: '123456'
    },
    LoginResposta: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      usuario: {
        id: 1,
        nome: 'Joao Silva',
        usuario: 'joao',
        perfil: 'recepcao'
      }
    },
    Pet: {
      id: 1,
      nome: 'Rex',
      especie: 'Cachorro',
      criada_em: '2024-01-01T00:00:00.000Z',
      atualizada_em: '2024-01-01T00:00:00.000Z'
    },
    NovoPet: {
      $nome: 'Rex',
      $especie: 'Cachorro'
    },
    Atendimento: {
      id: 1,
      data_hora: '2024-06-15T10:00:00.000Z',
      motivo: 'Consulta de rotina',
      status: 'agendado',
      pet_id: 1,
      usuario_id: 1,
      criada_em: '2024-01-01T00:00:00.000Z',
      atualizada_em: '2024-01-01T00:00:00.000Z'
    },
    NovoAtendimento: {
      $data_hora: '2024-06-15T10:00:00.000Z',
      $motivo: 'Consulta de rotina',
      $pet_id: 1
    }
  }
};

const outputFile = './config/swagger_output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
