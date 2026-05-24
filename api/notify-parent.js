export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.CALLMEBOT_API_KEY
  const phone = process.env.PARENT_WHATSAPP || '5491163679158'

  if (!apiKey) {
    return res.status(503).json({ error: 'WhatsApp not configured' })
  }

  const { correct, total, prize } = req.body || {}
  const formatted = Number(prize || 0).toLocaleString('es-AR')

  const text = `🎂 Quiz cumple Santino

Respuestas correctas: ${correct}/${total}
Total a transferir MercadoPago: $${formatted}

Enviado desde la carta de cumpleaños ❤️`

  try {
    const url =
      `https://api.callmebot.com/whatsapp.php?phone=${phone}` +
      `&text=${encodeURIComponent(text)}&apikey=${apiKey}`

    await fetch(url)
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Failed to send' })
  }
}
