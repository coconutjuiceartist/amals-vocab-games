// API deprecated: definitions are provided in `data/vocab.js` and this endpoint is no longer used.
export async function POST() {
  return new Response(JSON.stringify({ error: 'deprecated', message: 'API definitions endpoint is deprecated. Use pre-defined data/vocab.js' }), { status: 410, headers: { 'Content-Type': 'application/json' } })
}
