import QRCode from 'qrcode'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const message = readFileSync(join(__dirname, '../src/data/message.js'), 'utf8')
const match = message.match(/siteUrl:\s*['"]([^'"]+)['"]/)
const siteUrl = match?.[1] || 'https://regalo-boda-chi.vercel.app'

await QRCode.toFile(join(__dirname, '../public/qr.png'), siteUrl, {
  width: 1024,
  margin: 4,
  errorCorrectionLevel: 'H',
  color: { dark: '#000000', light: '#FFFFFF' }
})

console.log('QR generado:', siteUrl, '→ public/qr.png')
