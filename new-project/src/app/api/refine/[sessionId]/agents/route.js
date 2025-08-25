import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { sessionId } = params;
    
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:8000'}/refine/${sessionId}/agents`);
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Agents GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent responses' },
      { status: 500 }
    );
  }
}



