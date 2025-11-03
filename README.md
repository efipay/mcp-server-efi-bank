# Servidor MCP Efí

Servidor Node.js implementando o Model Context Protocol (MCP) para operações das APIs do Efí Bank.

## Características

- Gestão de cobranças PIX imediatas
- Pagamentos e transferências PIX
- Operações de devolução PIX
- Configuração de webhooks
- Saldo da conta e configurações
- Gerenciamento de EVP (Chaves Aleatórias)
- Tratamento de MED (Mecanismo Especial de Devolução)

## Instalação

### NPX

```bash
npx mcp-server-efi
```

### Docker

```bash
docker run -i --rm mcp-server-efi \
  --sandbox=false \
  --client-id=seu_client_id \
  --client-secret=seu_client_secret \
  --certificate=seu_certificado_base64 \
  --validate-mtls=true
```

## Configuração

O servidor requer as seguintes variáveis de ambiente:

- `sandbox`: Defina como `"false"` para produção ou `"true"` para ambiente sandbox
- `client-id`: Seu Client ID da aplicação do Efí Bank
- `client-secret`: Seu Client Secret da aplicação do Efí Bank
- `certificate`: Seu certificado do Efí Bank em formato Base64
- `validate-mtls`: Defina como `"true"` para validar mTLS nos webhooks (opcional, padrão é true)

## API

### Cobranças PIX Imediatas

- **pix_create_immediate_charge**
  - Criar cobrança PIX imediata sem especificar txid
  - Gera cobrança com tempo de expiração, valor, chave PIX e informações opcionais do devedor

- **pix_create_charge**
  - Criar cobrança PIX imediata com txid específico
  - Entrada: txid, detalhes da cobrança (valor, chave PIX, info do devedor, etc.)

- **pix_update_charge**
  - Atualizar cobrança existente por txid
  - Modificar expiração, info do devedor, valor ou informações adicionais

- **pix_detail_charge**
  - Obter detalhes da cobrança por txid
  - Retorna informações completas da cobrança incluindo status e detalhes do pagamento

- **pix_list_charges**
  - Listar cobranças com opções de filtro
  - Filtrar por intervalo de datas, CPF/CNPJ, status e paginação

### Pagamentos e Transferências PIX

- **pix_send**
  - Enviar pagamento PIX para uma chave PIX ou conta bancária
  - Suporte para chave PIX ou detalhes de conta bancária como destino

- **pix_send_detail**
  - Obter detalhes do PIX enviado por e2eId
  - Retorna informações completas da transação

- **pix_send_list**
  - Listar transações PIX enviadas com opções de filtro
  - Filtrar por intervalo de datas, status e presença de devolução

- **pix_qr_code_pay**
  - Pagar QR Code PIX via API
  - Processar pagamentos de QR Code com informações do pagador

### Gestão PIX

- **pix_detail_received**
  - Obter detalhes do PIX recebido por e2eId
  - Retorna informações da transação e devolução

- **pix_received_list**
  - Listar transações PIX recebidas
  - Filtrar por data, txid, CPF/CNPJ com suporte a paginação

- **pix_devolution**
  - Criar devolução PIX (estorno)
  - Entrada: e2eId, ID da devolução e valor

- **pix_detail_devolution**
  - Obter detalhes da devolução por e2eId e ID da devolução

### Webhooks

- **pix_config_webhook**
  - Configurar URL do webhook para notificações PIX
  - Definir endpoint do webhook para notificações de transação

- **pix_detail_webhook**
  - Obter detalhes da configuração do webhook por chave PIX

- **pix_list_webhook**
  - Listar todos os webhooks configurados

- **pix_delete_webhook**
  - Excluir configuração de webhook por chave PIX

- **pix_resend_webhook**
  - Reenviar notificações de webhook para transações específicas

### Gestão de Conta

- **get_account_balance**
  - Obter saldo atual da conta
  - Retorna informações de saldo disponível

- **update_account_config**
  - Atualizar configurações PIX da conta
  - Configurar definições de chave PIX, restrições e preferências de webhook

- **list_account_config**
  - Listar configurações atuais da conta
  - Retorna todas as configurações PIX e da conta

### Gestão de EVP (Chaves Aleatórias)

- **pix_create_evp**
  - Criar nova chave PIX aleatória (EVP)
  - Gera chave aleatória para transações PIX

- **pix_list_evp**
  - Listar todas as chaves EVP registradas

- **pix_delete_evp**
  - Excluir chave EVP específica

### MED

- **med_list**
  - Listar infrações MED abertas contra a conta
  - Filtrar por intervalo de datas com paginação

### Funcionalidades Adicionais

- **pix_get_receipt**
  - Obter comprovante da transação (formato PDF)
  - Gerar comprovante por e2eId, txid ou rtrId

## Uso com Claude Desktop

Adicione isso ao seu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-server-efi": {
      "command": "npx",
      "args": [
        "mcp-server-efi",
        "--sandbox=false",
        "--client-id=seu_client_id",
        "--client-secret=seu_client_secret",
        "--certificate=seu_certificado_base64",
        "--validate-mtls=true"
      ]
    }
  }
}

```

### Uso com Docker no Claude Desktop

```json
{
  "mcpServers": {
    "mcp-server-efi": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "mcp-server-efi",
        "--sandbox=false",
        "--client-id=seu_client_id",
        "--client-secret=seu_client_secret",
        "--certificate=seu_certificado_base64",
        "--validate-mtls=true"
      ]
    }
  }
}
```

## Uso com VS Code

Para instalação manual, adicione o seguinte às configurações do VS Code ou `.vscode/mcp.json`:

### NPX

```json
{
  "mcp": {
    "servers": {
      "mcp-server-efi": {
        "command": "npx",
        "args": [
          "mcp-server-efi",
          "--sandbox=false",
          "--client-id=seu_client_id",
          "--client-secret=seu_client_secret",
          "--certificate=seu_certificado_base64",
          "--validate-mtls=true"
        ]
      }
    }
  }
}
```

### Docker

```json
{
  "mcp": {
    "servers": {
      "mcp-server-efi": {
        "command": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "mcp-server-efi",
          "--sandbox=false",
          "--client-id=seu_client_id",
          "--client-secret=seu_client_secret",
          "--certificate=seu_certificado_base64",
          "--validate-mtls=true"
        ]
      }
    }
  }
}
```

## Build

### Desenvolvimento Local

```bash
npm install
npm run build
npm start
```

### Build Docker

```bash
docker build -t mcp-server-efi .
```

## Notas de Segurança

- Sempre use credenciais de produção (`sandbox=false`) para transações reais
- Mantenha seus certificados e credenciais seguros
- Habilite a validação mTLS (`validate-mtls=true`) para segurança do webhook
- Todas as chamadas da API são autenticadas usando a implementação OAuth 2.0 do Efí Pay

## Suporte

Para documentação e suporte da API do Efí Pay, visite: https://dev.efipay.com.br/
