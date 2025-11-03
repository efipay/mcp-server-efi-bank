import EfiPay from "sdk-node-apis-efi";
import { env } from '../env/index.js'

//@ts-ignore
export const EfiSDK = new EfiPay({
    sandbox: env.SANDBOX,
    client_id: env.CLIENT_ID,
    client_secret: env.CLIENT_SECRET,
    certificate: env.CERTIFICATE,
    cert_base64: true,
    validate_mtls: env.VALIDATE_MTLS
})