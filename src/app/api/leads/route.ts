import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, contact, category, timeline, investment, addons, notes } = data

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            name: name || 'Anonymous',
            contact: contact || 'Not provided',
            category: category || '',
            timeline: timeline || '',
            investment: investment || '',
            addons: addons || '',
            notes: notes || '',
          }),
        })
      } catch (webhookError) {
        console.error('Failed to forward lead to Google Sheets webhook:', webhookError)
      }
    } else {
      console.log('Lead received (configure GOOGLE_SHEETS_WEBHOOK_URL in environment):', data)
    }

    return NextResponse.json({ success: true, message: 'Lead captured successfully' })
  } catch (error) {
    console.error('Error processing lead:', error)
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 })
  }
}
