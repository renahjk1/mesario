# Sistema de Vagas para Mesários - Eleições 2026

Sistema web desenvolvido para captação de mesários para as eleições de 2026, com design oficial gov.br e integração com APIs de validação de dados.

## 🎯 Funcionalidades

### 1. Tela Inicial - Captura de CPF
- Design oficial gov.br mantido fielmente
- Validação de CPF no frontend (dígitos verificadores)
- Máscara automática de formatação (000.000.000-00)
- Redirecionamento automático após validação

### 2. Validação de Dados Pessoais
- **Integração com API de CPF**: `https://fluxos.kodexpert.com.br/webhook/e3358323-f6eb-42e5-8a54-7513d794b2c4/kodexpert/api/{CPF}`
- Três perguntas de validação:
  1. Nome da mãe (validado com API)
  2. Data de nascimento (validado com API)
  3. Estado civil (aceita qualquer resposta)
- Confirmação visual após validação bem-sucedida

### 3. Captura de CEP
- Solicitação de CEP para análise de zona eleitoral
- **Integração com ViaCEP**: `https://viacep.com.br/ws/{CEP}/json/`
- Loading de 3 segundos simulando análise de disponibilidade
- Extração automática de cidade e estado

### 4. Tela de Vagas Disponíveis
- Exibição da cidade do usuário
- **Sempre mostra "Apenas 4 vagas disponíveis"** (conforme requisito)
- Função: **MESÁRIO 2**
- Atribuições detalhadas:
  - Auxiliar na identificação dos eleitores
  - Orientar sobre o processo de votação
  - Organizar filas e manter ordem
  - Registrar ocorrências
  - Apoiar o Presidente da Mesa
- Informações de remuneração: R$ 250,00 por dia
- Botão "Preencher Vaga" para avançar

### 5. Chat de Confirmação (Typebot)
- Integração com Typebot para finalização
- Passagem de parâmetros via URL (CPF, CEP, etc.)
- Confirmação de zona eleitoral e datas

## 🔧 Tecnologias Utilizadas

- **Frontend**: React 19 + TypeScript
- **Styling**: CSS gov.br original + Tailwind CSS 4
- **Roteamento**: Wouter
- **Backend**: Express 4 + tRPC 11
- **Database**: MySQL/TiDB (via Drizzle ORM)
- **Chat**: Typebot

## 📋 APIs Integradas

### 1. API de CPF (KodExpert)
```
GET https://fluxos.kodexpert.com.br/webhook/e3358323-f6eb-42e5-8a54-7513d794b2c4/kodexpert/api/{CPF}
```
**Retorna**: Dados pessoais incluindo nome, nome da mãe, data de nascimento

### 2. API de CEP (ViaCEP)
```
GET https://viacep.com.br/ws/{CEP}/json/
```
**Retorna**: Endereço completo incluindo cidade, estado, bairro

### 3. Typebot (Chat)
- **API Host**: Configurável no código
- **ID do Bot**: Configurável no código
- Recebe parâmetros via `prefilledVariables`

## 🚀 Como Usar

### Fluxo do Usuário

1. **Página Inicial** (`/`)
   - Digite o CPF
   - Clique em "Continuar"

2. **Validação** (`/validacao?cpf={CPF}`)
   - Responda as 3 perguntas de segurança
   - Aguarde confirmação
   - Informe o CEP
   - Aguarde análise (3 segundos)

3. **Vagas** (`/vagas?cep={CEP}&cpf={CPF}`)
   - Visualize as vagas disponíveis
   - Clique em "Preencher Vaga"

4. **Chat** (`/chat`)
   - Complete a inscrição via chat
   - Confirme zona eleitoral e datas

## ⚙️ Configuração do Typebot

Para que o chat funcione corretamente, edite o arquivo `client/src/pages/Chat.tsx` e configure:

```typescript
Typebot.initStandard({ 
  apiHost: "SUA_URL_AQUI",           // URL da sua instância Typebot
  id: "SEU_ID_AQUI",                  // ID do elemento
  typebot: "SEU_BOT_SLUG_AQUI",       // Slug/nome do seu bot
  prefilledVariables: { ...window.typebotWpUser, ...queryParams }
});
```

E também atualize o ID do elemento:

```typescript
typebotElement.setAttribute("id", "SEU_ID_AQUI");
```

## 📁 Estrutura do Projeto

```
client/
├── public/
│   ├── css/          # Estilos gov.br originais
│   ├── js/           # Scripts gov.br (jQuery, máscaras, etc)
│   ├── images/       # Imagens e logos gov.br
│   └── favicon.ico
├── src/
│   ├── pages/
│   │   ├── Home.tsx       # Tela inicial (CPF)
│   │   ├── Validacao.tsx  # Validação de dados + CEP
│   │   ├── Vagas.tsx      # Vagas disponíveis
│   │   └── Chat.tsx       # Chat Typebot
│   └── App.tsx            # Rotas
server/
├── routers.ts        # tRPC procedures
└── db.ts             # Database helpers
```

## 🎨 Design

O projeto mantém **100% do design oficial gov.br**, incluindo:
- Header com logo e acessibilidade (Alto Contraste, VLibras)
- Sidebar com imagem institucional
- Card principal com formulários
- Botões e inputs no padrão gov.br
- Cores oficiais (#008C32 para verde, etc)
- Tipografia Rawline

## 📝 Notas Importantes

1. **Sempre 4 vagas**: O sistema sempre exibe "Apenas 4 vagas disponíveis", independente da região
2. **Função fixa**: Sempre oferece a função "MESÁRIO 2"
3. **Validação de segurança**: Nome da mãe e data de nascimento são validados com a API
4. **Estado civil**: Aceita qualquer resposta (não valida)
5. **Loading de 3s**: Após informar CEP, há um delay intencional de 3 segundos

## 🔐 Segurança

- Validação de CPF no frontend (dígitos verificadores)
- Validação de dados pessoais via API externa
- Todas as APIs são chamadas via HTTPS

## 📞 Suporte

Para dúvidas sobre o sistema de mesários, consulte o site oficial do TRE do seu estado.

---

**Desenvolvido para as Eleições 2026**
