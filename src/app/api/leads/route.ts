import { NextResponse } from 'next/server'

// Simple string sanitizer: trims and limits max length to avoid DOS / buffer overflows
function sanitizeString(val: unknown, maxLength = 250): string {
  if (typeof val !== 'string') return ''
  return val.trim().slice(0, maxLength).replace(/[\r\n]+/g, ' ')
}

export async function POST(req: Request) {
  try {
    // 1. Enforce payload size limit (max 32KB)
    const contentLength = req.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > 32768) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
    }

    const data = await req.json()
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    // 2. Anti-spam honeypot: reject if hidden bot field is filled
    if (data.website_trap || data.honeypot) {
      return NextResponse.json({ success: true, message: 'Request processed' })
    }

    // 3. Extract and sanitize input fields
    const name = sanitizeString(data.name, 100) || 'Anonymous'
    const contact = sanitizeString(data.contact, 150) || 'Not provided'
    const category = sanitizeString(data.category, 120)
    const timeline = sanitizeString(data.timeline, 60)
    const investment = sanitizeString(data.investment, 60)
    const addons = sanitizeString(data.addons, 150)
    const notes = sanitizeString(data.notes, 1000)

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (webhookUrl && webhookUrl.startsWith('https://script.google.com/')) {
      try {
        // 4. Webhook dispatch with strict 6-second timeout to prevent hanging serverless execution
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            name,
            contact,
            category,
            timeline,
            investment,
            addons,
            notes,
          }),
          signal: AbortSignal.timeout(6000),
        })
      } catch (webhookError) {
        // Redact PII from error logs
        console.error('External webhook dispatch failed:', (webhookError as Error)?.message || 'Timeout/Network error')
      }
    }

    return NextResponse.json({ success: true, message: 'Lead captured successfully' })
  } catch (error) {
    console.error('Error processing lead submission:', (error as Error)?.message || 'Malformed request')
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 })
  }
}
