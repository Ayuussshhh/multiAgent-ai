import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:8000'}/health`);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Backend connection failed',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        database_connected: false,
        ai_service_available: false
      },
      { status: 503 }
    );
  }
}
