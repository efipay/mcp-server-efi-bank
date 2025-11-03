import { z } from 'zod';
import minimist from 'minimist';

const rawArgs = minimist(process.argv.slice(2));

const booleanString = z
  .string()
  .transform((val) => val.toLowerCase())
  .refine((val) => val === 'true' || val === 'false', {
    message: 'Deve ser "true" ou "false" (case insensitive)',
  })
  .transform((val) => val === 'true');

const envSchema = z.object({
  sandbox: booleanString,
  'client-id': z.string(),
  'client-secret': z.string(),
  certificate: z.string(),
  'validate-mtls': z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined) return true; // valor padrão
      const lowered = val.toLowerCase();
      if (lowered === 'true') return true;
      if (lowered === 'false') return false;
      throw new Error('validate-mtls deve ser "true" ou "false"');
    }),
});

// Faz o parse dos argumentos
const _env = envSchema.safeParse(rawArgs);

if (!_env.success) {
  console.error('Falha ao validar argumentos:', _env.error.format());
  throw new Error('Argumentos inválidos');
}

export const env = {
  SANDBOX: _env.data.sandbox,
  CLIENT_ID: _env.data['client-id'],
  CLIENT_SECRET: _env.data['client-secret'],
  CERTIFICATE: _env.data.certificate,
  VALIDATE_MTLS: _env.data['validate-mtls'] ?? true,
};
