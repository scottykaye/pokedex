import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    products: [{ id: 1, name: 'test' }],
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  // curl -X POST -d '{"id": 12, "name": "Scott"}' -H "Content-Type: application/json" localhost:3000/api
  return NextResponse.json({
    data,
  })
}
