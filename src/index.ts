#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SERVER_CONFIG } from './config/api.js';
import { pixCreateImmediateChargeTool } from './tools/pix/cob/pixCreateImmediateCharge.js';
import { pixCreateChargeTool } from './tools/pix/cob/pixCreateCharge.js';
import { pixDetailChargeTool } from './tools/pix/cob/pixDetailCharge.js';
import { pixUpdateChargeTool } from './tools/pix/cob/pixUpdateCharge.js';
import { pixListChargesTool } from './tools/pix/cob/pixListCharges.js';
import { pixSendTool } from './tools/pix/payment/pixSend.js';
import { pixSendDetailTool } from './tools/pix/payment/pixSendDetail.js';
import { pixSendDetailIdTool } from './tools/pix/payment/pixSendDetailId.js';
import { pixSendListTool } from './tools/pix/payment/pixSendList.js';
import { pixQrCodePayTool } from './tools/pix/payment/pixQrCodePay.js';
import { pixDetailReceivedTool } from './tools/pix/management/pixDetailReceived.js';
import { pixReceivedListTool } from './tools/pix/management/pixReceivedList.js';
import { pixDevolutionTool } from './tools/pix/management/pixDevolution.js';
import { pixDetailDevolutionTool } from './tools/pix/management/pixDetailDevolution.js';
import { pixConfigWebhookTool } from './tools/pix/webhooks/pixConfigWebhook.js';
import { pixDetailWebhookTool } from './tools/pix/webhooks/pixDetailWebhook.js';
import { pixListWebhookTool } from './tools/pix/webhooks/pixListWebhook.js';
import { pixDeleteWebhookTool } from './tools/pix/webhooks/pixDeleteWebhook.js';
import { pixResendWebhookTool } from './tools/pix/webhooks/pixResendWebhook.js';
import { pixCreateEvpTool } from './tools/exclusives/key/pixCreateEvp.js';
import { pixListEvpTool } from './tools/exclusives/key/pixListEvp.js';
import { pixDeleteEvpTool } from './tools/exclusives/key/pixDeleteEvp.js';
import { getAccountBalanceTool } from './tools/exclusives/account/getAccountBalance.js';
import { updateAccountConfigTool } from './tools/exclusives/account/updateAccountConfig.js';
import { listAccountConfigTool } from './tools/exclusives/account/listAccountConfig.js';
import { pixGetReceiptTool } from './tools/exclusives/pix/pixGetReceipt.js';

async function initializeServer() {
  const server = new McpServer({
    name: SERVER_CONFIG.name,
    version: SERVER_CONFIG.version,
    description: SERVER_CONFIG.description,
  });

  // Cobranças Imediatas

  server.tool(
    pixCreateImmediateChargeTool.name,
    pixCreateImmediateChargeTool.description,
    pixCreateImmediateChargeTool.parameters,
    pixCreateImmediateChargeTool.handler,
  );

  server.tool(
    pixCreateChargeTool.name,
    pixCreateChargeTool.description,
    pixCreateChargeTool.parameters,
    pixCreateChargeTool.handler,
  );

  server.tool(
    pixUpdateChargeTool.name,
    pixUpdateChargeTool.description,
    pixUpdateChargeTool.parameters,
    pixUpdateChargeTool.handler,
  );

  server.tool(
    pixDetailChargeTool.name,
    pixDetailChargeTool.description,
    pixDetailChargeTool.parameters,
    pixDetailChargeTool.handler,
  );

  server.tool(
    pixListChargesTool.name,
    pixListChargesTool.description,
    pixListChargesTool.parameters,
    pixListChargesTool.handler,
  );

  // Envio e Pagamento Pix

  server.tool(
    pixSendTool.name,
    pixSendTool.description,
    pixSendTool.parameters,
    pixSendTool.handler,
  );

  server.tool(
    pixSendDetailTool.name,
    pixSendDetailTool.description,
    pixSendDetailTool.parameters,
    pixSendDetailTool.handler,
  );

  server.tool(
    pixSendDetailIdTool.name,
    pixSendDetailIdTool.description,
    pixSendDetailIdTool.parameters,
    pixSendDetailIdTool.handler,
  );

  server.tool(
    pixSendListTool.name,
    pixSendListTool.description,
    pixSendListTool.parameters,
    pixSendListTool.handler,
  );

  server.tool(
    pixQrCodePayTool.name,
    pixQrCodePayTool.description,
    pixQrCodePayTool.parameters,
    pixQrCodePayTool.handler,
  );

  // Gestão de Pix

  server.tool(
    pixDetailReceivedTool.name,
    pixDetailReceivedTool.description,
    pixDetailReceivedTool.parameters,
    pixDetailReceivedTool.handler,
  );

  server.tool(
    pixReceivedListTool.name,
    pixReceivedListTool.description,
    pixReceivedListTool.parameters,
    pixReceivedListTool.handler,
  );

  server.tool(
    pixDevolutionTool.name,
    pixDevolutionTool.description,
    pixDevolutionTool.parameters,
    pixDevolutionTool.handler,
  );

  server.tool(
    pixDetailDevolutionTool.name,
    pixDetailDevolutionTool.description,
    pixDetailDevolutionTool.parameters,
    pixDetailDevolutionTool.handler,
  );

  // Webhooks

  server.tool(
    pixConfigWebhookTool.name,
    pixConfigWebhookTool.description,
    pixConfigWebhookTool.parameters,
    pixConfigWebhookTool.handler,
  );

  server.tool(
    pixDetailWebhookTool.name,
    pixDetailWebhookTool.description,
    pixDetailWebhookTool.parameters,
    pixDetailWebhookTool.handler,
  );

  server.tool(
    pixListWebhookTool.name,
    pixListWebhookTool.description,
    pixListWebhookTool.parameters,
    pixListWebhookTool.handler,
  );

  server.tool(
    pixDeleteWebhookTool.name,
    pixDeleteWebhookTool.description,
    pixDeleteWebhookTool.parameters,
    pixDeleteWebhookTool.handler,
  );

  server.tool(
    pixResendWebhookTool.name,
    pixResendWebhookTool.description,
    pixResendWebhookTool.parameters,
    pixResendWebhookTool.handler,
  );

  // Endpoints Exclusivos

  server.tool(
    pixCreateEvpTool.name,
    pixCreateEvpTool.description,
    pixCreateEvpTool.parameters,
    pixCreateEvpTool.handler,
  );

  server.tool(
    pixListEvpTool.name,
    pixListEvpTool.description,
    pixListEvpTool.parameters,
    pixListEvpTool.handler,
  );

  server.tool(
    pixDeleteEvpTool.name,
    pixDeleteEvpTool.description,
    pixDeleteEvpTool.parameters,
    pixDeleteEvpTool.handler,
  );

  server.tool(
    getAccountBalanceTool.name,
    getAccountBalanceTool.description,
    getAccountBalanceTool.parameters,
    getAccountBalanceTool.handler,
  );

  server.tool(
    updateAccountConfigTool.name,
    updateAccountConfigTool.description,
    updateAccountConfigTool.parameters,
    updateAccountConfigTool.handler,
  );

  server.tool(
    listAccountConfigTool.name,
    listAccountConfigTool.description,
    listAccountConfigTool.parameters,
    listAccountConfigTool.handler,
  );

  server.tool(
    pixGetReceiptTool.name,
    pixGetReceiptTool.description,
    pixGetReceiptTool.parameters,
    pixGetReceiptTool.handler,
  );

  return server;
}

async function main() {
  const server = await initializeServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Efi APIs MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
